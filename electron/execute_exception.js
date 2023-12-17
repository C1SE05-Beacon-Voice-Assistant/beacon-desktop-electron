/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const player = require("sound-play");
const path = require("path");
// Định nghĩa các thông tin lỗi
const exceptions = {
  listenToMusicYoutube: {
    id: 1,
    errorCode: "ERR001",
    errorType: "ErrorFind",
    soundFile: path.join(__dirname, "assets/song_not_found.wav"),
  },
  listenToMusicMp3: {
    id: 2,
    errorCode: "ERR002",
    errorType: "ErrorFind",
    soundFile: path.join(__dirname, "assets/song_not_found.wav"),
  },
  readNews: {
    id: 3,
    errorCode: "ERR003",
    errorType: "ErrorKey",
    soundFile: path.join(__dirname, "assets/news_not_found.wav"),
  },
  increaseVolume: {
    id: 4,
    errorCode: "ERR004",
    errorType: "ErrorVolume",
    soundFile: path.join(__dirname, "assets/error_increase_volume.wav"),
  },
  decreaseVolume: {
    id: 5,
    errorCode: "ERR005",
    errorType: "ErrorVolume",
    soundFile: path.join(__dirname, "assets/error_decrease_volume.wav"),
  },
  mute: {
    id: 5,
    errorCode: "ERR006",
    errorType: "ErrorMute",
    soundFile: path.join(__dirname, "assets/error_mute.wav"),
  },
  unmute: {
    id: 7,
    errorCode: "ERR007",
    errorType: "ErrorUnmute",
    soundFile: path.join(__dirname, "assets/error_unmute.wav"),
  },
  noInternet: {
    id: 8,
    errorCode: "ERR008",
    errorType: "ErrorInternet",
    soundFile: path.join(__dirname, "assets/no_internet.wav"),
  },
};

// Hàm thực thi và render ra file âm thanh
function executeException(funcName) {
  if (funcName in exceptions) {
    const exception = exceptions[funcName];
    const { soundFile } = exception;
    setTimeout(async () => {
      await player.play(soundFile);
    }, 2000);
  } else {
    console.log(`No exception found for ${funcName}`);
  }
}

// Sử dụng hàm executeException và truyền vào tên chức năng để kiểm tra
module.exports = executeException;
