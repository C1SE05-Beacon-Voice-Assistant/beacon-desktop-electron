/* eslint-disable @typescript-eslint/no-var-requires */
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

module.exports = checkInternetConnection;
