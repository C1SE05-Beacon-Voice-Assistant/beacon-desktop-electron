/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");

const checkInternetConnection = async () => {
  return new Promise((resolve) => {
    http
      .get("http://www.google.com", (res) => {
        resolve(true);
      })
      .on("error", (err) => {
        resolve(false);
      });
  });
};

module.exports = checkInternetConnection;
