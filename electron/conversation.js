/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { join } = require("path");
const fs = require("fs");
const cron = require('node-cron');

let options = {
  mode: "text",
  pythonPath: join(__dirname, "../beacon_package/venv39/Scripts/python.exe"),
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: join(__dirname, "../beacon_package"),
};
async function storeConversation() {

  const data = await PythonShell.run("conversation.py", options);
  return data;
}
async function getAllConversations() {
  const lines =   fs.readFileSync(
    "/beacon/beacon-desktop-electron/beacon_package/log/main.log",
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        console.error("Đã xảy ra lỗi khi đọc file:", err);
        return;
      }

      return data;
    }
  );
  const conversations = lines.split("\n"); // Tách nội dung thành các dòng
  // Append từng dòng vào mảng
  let array = [];
  conversations.forEach((line) => {
    array.push(JSON.parse(JSON.stringify(line)))
  });
  return array
}
async function clearConversations() {
  cron.schedule('*/10 * * * * *',async () => {
    // Setting 10s
    await PythonShell.run("schedule_submit_clear_tmp.py", options);
  });
}
module.exports = {
  storeConversation,
  getAllConversations,
  clearConversations
};
