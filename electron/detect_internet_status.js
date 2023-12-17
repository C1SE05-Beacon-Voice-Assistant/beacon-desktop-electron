/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");

const checkInternetConnection = async () => {
  http
    .get("http://www.google.com", (res) => {
      return true;
    })
    .on("error", () => {
      return false;
    });
};

module.exports = checkInternetConnection;
