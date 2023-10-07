/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { contextBridge } = require("electron");

function sendToPython() {
  const input = document.getElementById("text");
  console.log("input", input.value);

  const options = {
    pythonPath: "./beacon-package/venv39/Scripts/python.exe",
    mode: "text",
    args: [input.value],
  };

  PythonShell.run("./beacon-package/beacon_speech.py", options)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

contextBridge.exposeInMainWorld("electron", {
  sendToPython: sendToPython,
});
