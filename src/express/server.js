const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const { createServer } = require("http");
const app = express();
const httpServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const startSocketIO = require("../vgpad/index");

const port = process.env.VUE_APP_EXPRESS_PORT;

// eslint-disable-next-line no-undef
const staticFileMiddleware = express.static(path.join(__static, "vgamepad"));

module.exports = function startAllServer() {
  app.use(staticFileMiddleware);
  app.use(history());

  startSocketIO(io);

  let server = httpServer.listen(port, () => {
    console.log(`This app listening on port ${port}`);
  });
  server.on("error", (e) => {
    // 检测端口是否占用
    // Check if the port is occupied
    if (e.code === "EADDRINUSE") {
      console.log("Address in use, retrying...");
      setTimeout(() => {
        server.close();
        server.listen(port);
      }, 1000);
    }
  });
};
