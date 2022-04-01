const ViGEmClient = require("vigemclient");

// ViGEm client
let client = new ViGEmClient();
const connErr = client.connect();
if (connErr !== null) {
  console.log(
    "Error while connecting to the ViGEmBus driver:",
    connErr.message
  );
}

// add controller
module.exports = function addController() {
  let controller = client.createX360Controller();
  let err = controller.connect();
  if (err) {
    console.log(
      "Error while connecting to the virtual controller:",
      err.message
    );
    process.exit(1);
  }else{
    return controller;
  }
};
