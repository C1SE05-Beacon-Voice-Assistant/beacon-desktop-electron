/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const copyFiles = (src, dest) => {
  // create dist-electron/assets folder
  if (!fs.existsSync("dist-electron")) {
    fs.mkdirSync("dist-electron");
  }
  if (!fs.existsSync("dist-electron/assets")) {
    fs.mkdirSync("dist-electron/assets");
  }
  fs.readdir(src, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("copy file success");
          }
        });
      });
    }
  });
};

const src = path.join(__dirname, "public/assets");

const dest = path.join(__dirname, "dist-electron/assets");

copyFiles(src, dest);
