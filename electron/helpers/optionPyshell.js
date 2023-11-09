/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require("path");

const pythonPath = resolve(
  __dirname,
  "../../../app.asar.unpacked/beacon_package"
);

const options = {
  mode: "text",
  pythonPath: join(pythonPath, "/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: pythonPath,
};

module.exports = { options };
