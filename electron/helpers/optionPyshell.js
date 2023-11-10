/* eslint-disable @typescript-eslint/no-var-requires */
<<<<<<< HEAD
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
=======
const { join } = require("path");

const options = {
  mode: "text",
  pythonPath: join(__dirname, "../../beacon_package/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: join(__dirname, "../../beacon_package"),
>>>>>>> 2e33d66 (resolve conflict)
};

module.exports = { options };
