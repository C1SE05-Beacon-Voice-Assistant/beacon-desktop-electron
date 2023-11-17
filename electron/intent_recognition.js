/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");

async function intentRecognition(text) {
  const data = await PythonShell.run("intent.py", {
    ...options,
    args: [text],
  });

  return data;
}

// intentRecognition("Mở bài hát bạn đời")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = intentRecognition;
