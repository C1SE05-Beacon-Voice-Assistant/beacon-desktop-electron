/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require("path");
let pythonPath = "";
if (process.env.NODE_ENV === "production") {
  pythonPath = resolve(__dirname, "../../../app.asar.unpacked/beacon_package");
} else {
  pythonPath = resolve(__dirname, "../../beacon_package");
}

const options = {
  mode: "text",
  pythonPath: join(pythonPath, "/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: pythonPath,
};

module.exports = { options };
