/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");

const options = {
  mode: "text",
  pythonPath: join(__dirname, "../../beacon_package/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: join(__dirname, "../../beacon_package"),
};

module.exports = { options };
