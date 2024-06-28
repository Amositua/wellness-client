const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://equal-yoke-touted-vein-production.pipeops.app",
      changeOrigin: true,
    })
  );
};
