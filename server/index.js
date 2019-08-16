const config = require('./global/config')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || config.PORT;
const path = require("path");
const mockRouter = require("./mock");
const proxy = require("http-proxy-middleware");
var compression = require('compression');
var bodyParser = require('body-parser');

const API_ADDRESS = config.API_ADDRESS;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(compression());

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
