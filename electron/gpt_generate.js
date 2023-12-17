/* eslint-disable @typescript-eslint/no-var-requires */
const { instance } = require("./start");

async function gptGenerate(arrayInput) {
  const data = await instance.post("/generate", {
    history: arrayInput,
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
//     content: "Chào bạn, đây là Beacon. Bạn muốn tôi giúp gì?",
//   },
//   {
//     role: "user",
//     content: "Tôi muốn đặt lịch hẹn",
//   },
// ]).then((data) => console.log(data.data));

module.exports = gptGenerate;
