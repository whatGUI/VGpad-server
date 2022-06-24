const addController = require("../../vcontroller/ViGEmClient");
const VGamepad = require("../../vcontroller/controller");

function startSocketIO(io) {
  // 连接计数，最多4个
  //
  let connectionCounter = 0;

  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    // 限制最多4个虚拟手柄
    if (checkConnections()) {
      console.error("Maximum of 4 players");
      socket.emit("controller ready", false);
      socket.disconnect(true);
      return;
    }

    // 添加虚拟控制器
    let controller = addController();
    let vGamepad = new VGamepad(controller);

    // 通知客户端虚拟控制器准备完毕
    socket.emit("controller ready", true);

    vGamepad.getInfo();

    socket.on("message", (message) => {
      console.log("message:", message);
    });

    // 按键事件响应
    socket.on("button press", (buttonType, isPressed) => {
      vGamepad[buttonType](isPressed);
    });

    // 摇杆事件响应
    socket.on("joystick move", (type, x, y) => {
      vGamepad[type](x, y);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
      controller.disconnect();
      connectionCounter--;
    });
  });

  function checkConnections() {
    connectionCounter++;
    if (connectionCounter <= 4) {
      return false;
    } else {
      connectionCounter--;
      return true;
    }
  }
}

module.exports = startSocketIO;
