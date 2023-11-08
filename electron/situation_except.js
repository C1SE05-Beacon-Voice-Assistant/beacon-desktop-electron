const playsound = require('play-sound');
const path = require('path');
// Định nghĩa các thông tin lỗi
const exceptions = {
  listenToMusicYoutobe: {
    id: 1,
    errorCode: 'ERR001',
    errorType: 'ErrorFind',
    soundFile: path.join(__dirname, 'assets/Youtobe.mp3'),
  },
  listenToMusicMp3: {
    id: 2,
    errorCode: 'ERR002',
    errorType: 'ErrorFind',
    soundFile:  path.join(__dirname, 'assets/Mp3.mp3'),
  },
  readNews: {
    id: 3,
    errorCode: 'ERR003',
    errorType: 'ErrorKey',
    soundFile: path.join(__dirname, 'assets/ReadNews.mp3'),
  },
  increaseVolume: {
    id: 4,
    errorCode: 'ERR004',
    errorType: 'ErrorVolume',
    soundFile: path.join(__dirname, 'assets/InVolume.mp3'),
  },
  decreaseVolume: {
    id: 5,
    errorCode: 'ERR005',
    errorType: 'ErrorVolume',
    soundFile: path.join(__dirname, 'assets/DeVolume.mp3'),
  },
  mute: {
    id: 5,
    errorCode: 'ERR006',
    errorType: 'ErrorMute',
    soundFile: path.join(__dirname, 'assets/Mute.mp3'),
  },
  unmute: {
    id: 7,
    errorCode: 'ERR007',
    errorType: 'ErrorUnmute',
    soundFile: path.join(__dirname, 'assets/Unmute.mp3'),
  },
  noInternet: {
    id: 8,
    errorCode: 'ERR008',
    errorType: 'ErrorInternet',
    soundFile: path.join(__dirname, 'assets/Internet.mp3'),
  }
};

// Hàm thực thi và render ra file âm thanh
function executeException(funcName) {
  if (exceptions.hasOwnProperty(funcName)) {
    const exception = exceptions[funcName];
    const { id, errorCode, errorType, soundFile } = exception;
    console.log(`Exception: ${funcName}`);
    console.log(`ID: ${id}`);
    console.log(`Error Code: ${errorCode}`);
    console.log(`Error Type: ${errorType}`);

    // Render ra file âm thanh
    const player = playsound();
    // player.play(soundFile, function (err) {
    //   if (err) {
    //     console.error('Error playing sound:', err);
    //   }
    // });
    player.play(soundFile, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('done');
      }
    });
  } else {
    console.log(`No exception found for ${funcName}`);
  }
}

// Sử dụng hàm executeException và truyền vào tên chức năng để kiểm tra
module.exports = executeException;

// function playErrorSound() {
//   const audioPath = "assets/Youtobe.mp3";
//   const voiceFilePath = path.join(__dirname, audioPath);
//   console.log(voiceFilePath);
//   sound.play(voiceFilePath).then(() => console.log("done"));
//}

