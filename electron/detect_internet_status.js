const http = require("http");

const checkInternetConnection = (callback) => {
  http
    .get("http://www.google.com", (res) => {
      callback(true);
    })
    .on("error", () => {
      callback(false);
    });
};
checkInternetConnection((isConnected) => {
  if (isConnected) {
    console.log("Máy tính đang kết nối internet.");
  } else {
    console.log("Máy tính không có kết nối internet.");
  }

  return isConnected;
});

module.exports = { checkInternetConnection };
