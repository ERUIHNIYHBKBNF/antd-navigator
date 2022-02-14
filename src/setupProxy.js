const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/baidu", {
      target: "https://sp0.baidu.com",
      changeOrigin: true,
      pathRewrite: {
        "^/baidu": ""
      }
    })
  )
}
