//
// 定义所有按钮及摇杆的功能和虚拟控制器的操作交互
// Define all buttons and axes functions
//

module.exports = class VGamepad {
  constructor(controller) {
    this.controller = controller;
  }

  getInfo() {
    console.log("Index:", this.controller.index);
    console.log("User index:", this.controller.userIndex);
  }

  disconnect() {
    this.controller.disconnect();
  }

  // buttons
  START(value) {
    this.controller.button.START.setValue(value);
  }

  BACK(value) {
    this.controller.button.BACK.setValue(value);
  }

  LEFT_SHOULDER(value) {
    this.controller.button.LEFT_SHOULDER.setValue(value);
  }

  RIGHT_SHOULDER(value) {
    this.controller.button.RIGHT_SHOULDER.setValue(value);
  }

  LEFT_THUMB(value){
    this.controller.button.LEFT_THUMB.setValue(value);
  }

  RIGHT_THUMB(value){
    this.controller.button.RIGHT_THUMB.setValue(value);
  }

  A(value) {
    this.controller.button.A.setValue(value);
  }

  B(value) {
    this.controller.button.B.setValue(value);
  }

  X(value) {
    this.controller.button.X.setValue(value);
  }

  Y(value) {
    this.controller.button.Y.setValue(value);
  }

  // special buttons
  LEFT_TRIGGER(value) {
    if (value === true) {
      this.controller.axis.leftTrigger.setValue(1);
    } else {
      this.controller.axis.leftTrigger.setValue(0);
    }
  }

  RIGHT_TRIGGER(value) {
    if (value === true) {
      this.controller.axis.rightTrigger.setValue(1);
    } else {
      this.controller.axis.rightTrigger.setValue(0);
    }
  }

  DPAD_DOWN(value) {
    if (value === true) {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(-1);
    } else {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(0);
    }
  }

  DPAD_RIGHT(value) {
    if (value === true) {
      this.controller.axis.dpadHorz.setValue(1);
      this.controller.axis.dpadVert.setValue(0);
    } else {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(0);
    }
  }

  DPAD_UP(value) {
    if (value === true) {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(1);
    } else {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(0);
    }
  }

  DPAD_LEFT(value) {
    if (value === true) {
      this.controller.axis.dpadHorz.setValue(-1);
      this.controller.axis.dpadVert.setValue(0);
    } else {
      this.controller.axis.dpadHorz.setValue(0);
      this.controller.axis.dpadVert.setValue(0);
    }
  }

  // axis
  LEFT_AXIS(x, y) {
    this.controller.axis.leftX.setValue(x);
    this.controller.axis.leftY.setValue(y);
  }

  RIGHT_AXIS(x, y) {
    this.controller.axis.rightX.setValue(x);
    this.controller.axis.rightY.setValue(y);
  }
};
