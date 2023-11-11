/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { join } = require("path");

let options = {
  mode: "text",
  pythonPath: join(__dirname, "../beacon_package/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: join(__dirname, "../beacon_package"),
};

async function getAudioDevices() {
  console.log("detecting");
  let result = [];
  const data = await PythonShell.run("detect_device.py", options);

  result = data.map((item) => {
    const [id, name] = item.match(/\(([^,]+), '(.+)'\)/).slice(1, 3);
    return { id: parseInt(id, 10), name };
  });

  return result;
}

module.exports = getAudioDevices;
