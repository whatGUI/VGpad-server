const dgram = require("dgram");
const addController = require("../vgpad/ViGEmClient");
const VGamepad = require("../vgpad/controller");

let server;
const port = process.env.VUE_APP_UDP_PORT;

let controllers = [];

function startUdpServer() {
  server = dgram.createSocket("udp4");
  server.bind(port);

  server.on("listening", () => {
    const address = server.address();
    console.log(`UDP server listening on port:${address.port}`);
  });

  server.on("message", (msg, rinfo) => {
    // 解析udp报文内容
    let parsedMsg = msg.toString();

    if (parsedMsg === "FIND_VGPAD_SERVER") {
      // 响应客户端服务发现事件
      console.log("boradcast receicved from:", rinfo.address);
      let msg = JSON.stringify({ status: true });
      server.send(msg, rinfo.port, rinfo.address);
    } else {
      // 接收控制信息
      let controlMsg = JSON.parse(parsedMsg);
      // console.log(controlMsg);
      control(controlMsg);
    }
  });
}

function control(controlMsg) {
  let player = controlMsg.player;
  let count = player + 1 - controllers.length;
  if (count > 0 && count < 5) {
    // 添加新的控制器
    for (let i = 1; i <= count; i++) {
      let vGamepad = new VGamepad(addController());
      controllers.push(vGamepad);
    }
  } else {
    if (controlMsg.type === "LEFT_AXIS" || controlMsg.type === "RIGHT_AXIS") {
      // 摇杆响应
      controllers[player][controlMsg.type](
        controlMsg.args[0].x,
        controlMsg.args[0].y
      );
    } else {
      // 按键响应
      controllers[player][controlMsg.type](controlMsg.args[0]);
      // console.log(`button ${controlMsg.type} pressed:${controlMsg.args[0]} `);
    }
  }
}

function closeUdpServer() {
  server.close(() => {
    console.log("UDP server closed");
  });
  controllers.forEach((c) => c.disconnect());
}

module.exports = { startUdpServer, closeUdpServer };
