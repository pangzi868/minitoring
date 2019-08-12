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

app.use(
  "/",
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

app.listen(port, () => console.log(`Listening on port ${port}`));

// NODE_ENV=production node server/index.js
