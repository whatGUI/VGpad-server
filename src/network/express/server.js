const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const startSocketIO = require("../websocketServe/index");

const port = process.env.VUE_APP_EXPRESS_PORT;
// eslint-disable-next-line no-undef
const staticFileMiddleware = express.static(path.join(__static, "vgamepad"));

let app,httpServer,io,server;

function startWebServer() {
  app = express();
  httpServer = createServer(app);
  io = new Server(httpServer);
  
  startSocketIO(io);
  app.use(staticFileMiddleware);
  app.use(history());
  server = httpServer.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
  server.on("error", (e) => {
    console.log(e);
  });
}

function closeWebServer() {
  server.close(() => {
    console.log("HTTP server closed");
  });
  io.disconnectSockets();
}

module.exports = {
  startWebServer,
  closeWebServer,
};
