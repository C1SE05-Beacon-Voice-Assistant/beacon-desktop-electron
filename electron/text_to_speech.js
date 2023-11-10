/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");

async function textToSpeech(text) {
  const data = await PythonShell.run("text_to_speech.py", {
    ...options,
    args: [text],
  });

  return data;
}

module.exports = textToSpeech;
