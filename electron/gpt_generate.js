/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");

async function gptGenerate(arrayInput) {
  const data = await PythonShell.run("gpt_integration.py", {
    ...options,
    mode: "text",
    args: JSON.stringify(arrayInput),
  });

  return data;
}

// gptGenerate([
//   {
//     role: "user",
//     content: "xin chào",
//   },
//   {
//     role: "assistant",
//     content: "Chào bạn, đây là Bing. Bạn muốn tôi giúp gì?",
//   },
//   {
//     role: "user",
//     content: "Tôi muốn đặt lịch hẹn",
//   },
// ]).then((data) => console.log(data[0]));

module.exports = gptGenerate;
