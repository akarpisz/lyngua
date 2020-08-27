// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:5001/",
//       changeOrigin: true,
//     })
//   );
// };

const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5001",
      changeOrigin: true,
      secure: false,
    //   pathRewrite: {
    //     "^/api": "",
    //   },
    //   onProxyReq: function (proxyReq, req, res) {
    //     proxyReq.setHeader("localhost:3000", "localhost:5001");
    //   },
    })
  );
};
