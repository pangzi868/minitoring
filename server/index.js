const config = require('./global/config')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || config.PORT;
const path = require("path");
const mockRouter = require("./mock");
const proxy = require("http-proxy-middleware");
const superagent = require("superagent");
var compression = require('compression');
var bodyParser = require('body-parser');
const graphUtil = require("./graph/graph_util");
const router = express.Router();
// const randomColor = require('randomcolor')

// console.log(randomColor, 'randomcolor guiqing')

const API_ADDRESS = config.API_ADDRESS;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(compression());


/** 兰州业务代码，后期上线删除 START **/
var typeOpt = {
  transfer: "/assetList",
  guarantee: "/guaranteeList",
  social: "/socialList",
  composite: "/compreList"
};
var api = API_ADDRESS + "/crm-lz-ls/api/cust/relate";
/** 从后端拿数据 */
app.use("/crm-jj/api/relation_graph/:type", function (req, res, next) {
  console.log("req.query :", req.query);
  var type = req.params.type;
  var objectKey = req.query.name;
  var sessionId = req.query.sessionId;
  var sa = superagent
    .get(api + typeOpt[type])
    .set("Cookie", "JSESSIONID=" + sessionId);
  sa.query({ vertextId: objectKey });
  sa.then(function (data) {
    resHandler(data, req, res, next);
  }).catch(function (err) {
    res.send({
      payload: {
        status: -1,
        msg: "网络错误，请稍后重试"
      },
      success: false

    });
  });
});

function resHandler(data, req, res, next) {
  if (!data.body.payload) {
    res.json({
      status: -1,
      msg: "网络错误，请稍后重试",
      data: {}
    });
  } else {
    if (!data.body.payload.data && !data.body.payload.treeData) {
      catchError(res, Error("no graph data"), "无图数据", req.local, __line);
    } else {
      req.local = data.body.payload;
      next();
    }
  }
}
app.use(["/crm-jj/api/relation_graph/:type"], function (req, res, next) {
  var treeList = ["guarantee", "transfer", "social", "composite"];
  var type = req.params.type;
  if (treeList.indexOf(type) > -1) {
    try {
      req.local = req.local.treeData;
      graphUtil.traversalTree(req.local, function (data, prev) {
        graphUtil.setTreeProp(data, prev);
      });
      // cachData[type] = req.local
    } catch (e) {
      catchError(res, e, "node graph parse error", req.local, __line);
    }
    next();
  } else {
    next();
  }
});
/** 综合图谱 */
app.use("/crm-jj/api/relation_graph/composite", function (req, res, next) {
  try {
    graphUtil.addLabelToTreeName(req.local);
  } catch (e) {
    catchError(res, e, "node graph parse error", req.local, __line);
  }
  next();
});
/** 资金往来 */
app.use("/crm-jj/api/relation_graph/transfer", function (req, res, next) {
  try {
    graphUtil.sortTransfer(req.local);
    graphUtil.addLabelToTreeName(req.local);
  } catch (e) {
    catchError(res, e, "node graph parse error", req.local, __line);
  }
  next();
});
/** 担保关系 */
app.use('/crm-jj/api/relation_graph/guarantee', function (req, res, next) {
  try {
    graphUtil.sortGuarantee(req.local)
    graphUtil.setGuaranteeAttribute(req.local)
    graphUtil.addLabelToTreeName(req.local)
  } catch (e) {
    catchError(res, e, 'node graph parse error', req.local, __line)
  }
  next()
})
/** 社交关系 */
app.use('/crm-jj/api/relation_graph/social', function (req, res, next) {
  try {
    graphUtil.sortSocial(req.local)
    graphUtil.addLabelToTreeName(req.local)
  } catch (e) {
    catchError(res, e, 'node graph parse error', req.local, __line)
  }
  next()
})

/** 最终出口，发送处理结果 */
app.use("/crm-jj/api/relation_graph/:type", function (req, res, next) {
  res.send({
    success: true,
    msg: "ok",
    payload: req.local
  });
});

/** 兰州业务代码，后期上线删除 END **/

/**
 * 引用body-parser, 会解析body对象，导致http-proxy-middleware的post出错
 * onProxyReq 将解析后的body数据再转回来
*/
app.use(
  "/shungkon",
  proxy({
    target: API_ADDRESS, // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    onProxyReq: function (proxyReq, req, res, options) {
      if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json;charset=UTF-8');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
      }
    }
  })
);

//模板下载
router.get("/crm-lz-ls/api/product/download", function (req, res, next) {
  var url = API_ADDRESS + "/crm-lz-ls/api/product/download";
  var method = req.method.toLowerCase();
  // var reqUrl = myUtil.makeGetRequestUrl(url, req.query)
  var sa = superagent[method]("/crm-lz-ls/api/product/download").set(
    "Cookie",
    "JSESSIONID=" + req.cookies["JSESSIONID"]
  );
  sa.send(req.body)
    .responseType("blob")
    .then(res1 => {
      var disposition = res1.header["content-disposition"];
      res.set("content-disposition", disposition);
      res.set("Content-Type", "application/msexcel");
      res.send(res1.body);
    });
});

//进入了mock路由
app.use("/", mockRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}
function catchError(
  res,
  err,
  msg = "",
  data = {},
  line = __line,
  fnName = __function,
  fileName = __file
) {
  res.send({ status: -1, msg: msg });
}
app.listen(port, () => console.log(`Listening on port ${port}`));

// NODE_ENV=production node server/index.js
