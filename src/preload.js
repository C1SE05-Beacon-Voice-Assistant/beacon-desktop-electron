/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { contextBridge } = require("electron");

function wakeUp() {
  const options = {
    mode: "text",
    pythonPath: "./beacon-package/venv39/Scripts/python.exe",
    pythonOptions: ["-u"], // get print results in real-time
    encoding: "utf8",
    scriptPath: "./beacon-package",
  };

  PythonShell.run("./beacon_speech.py", options)
    .then((messages) => {
      console.log("messages: %j", messages);
    })
    .catch((err) => {
   console.log(err)
      console.log("123");
    });
}

contextBridge.exposeInMainWorld("electron", {
  wakeUp: wakeUp,
});
