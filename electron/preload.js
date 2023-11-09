/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const { Builder } = require("selenium-webdriver");
const { contextBridge, ipcRenderer } = require("electron");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const path = require("path");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "detect_internet_status.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
const { checkInternetConnection } = require(path.join(
  __dirname,
  "detect_internet_status.js"
));
const executeException = require(path.join(__dirname, "situation_except.js"));
// const { start, register } = require(path.join(__dirname, "start.js"));
// const beacon = new BeaconSpeech("Beacon", "Hanoi");


// process.env.API_URL = "http://localhost:8000/api";

console.log("cuoi1")
const init = async () => {
  checkInternetConnection((isConnected) => {
    if (isConnected) {
      console.error("Máy tính đang kết nối internet.");
    } else {
      console.log("Máy tính không có kết nối internet.");
      executeException('noInternet')
    }
    //   await textToSpeech("Xin chào, tôi là Beacon, tôi có thể giúp gì cho bạn?");
    //   start()
    //     .then(async (res) => {
    //       if (res) {
    //         console.log("exist");
    //         return true;
    //       } else {
    //         await textToSpeech("Hãy đăng ký thông tin của bạn");
    //         await textToSpeech("Nhập tên");
    //         const name = await beacon.recognizeFromMicrophone();
    //         await textToSpeech("Nhập số điện thoại");
    //         const phone = await beacon.recognizeFromMicrophone();
    //         const userInfo = {
    //           name,
    //           phone,
    //         };
    //         return register(userInfo);
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       const serviceBuilder = new ServiceBuilder(chromedriverPath);
    //       const driver = new Builder()
    //         .forBrowser("chrome")
    //         .setChromeService(serviceBuilder)
    //         .build();

    //       const beaconVolume = createBeaconVolume().then((result) => result);
    //       const listenToMusicWithDriver = listenToMusic(driver);
    //       const readNews = new ReadNewsController(driver);
    //       const searchNewsBy = readNews.search.bind(readNews);
    //       const selectOneToRead = readNews.selectOneToRead.bind(readNews);

    //       contextBridge.exposeInMainWorld("electron", {
    //         backgroundListen: beacon.backgroundListen.bind(beacon),
    //         stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
    //         beaconVolume,
    //         listenToMusic: listenToMusicWithDriver,
    //         readNews: { searchNewsBy, selectOneToRead },
    //         getAudioDevices,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
  });
};

init();

          return register(userInfo);
        }
      })
      .then((res) => {
        console.log(res);
        const serviceBuilder = new ServiceBuilder(chromedriverPath);
        const driver = new Builder()
          .forBrowser("chrome")
          .setChromeService(serviceBuilder)
          .build();

        const beaconVolume = createBeaconVolume().then((result) => result);
        const listenToMusicWithDriver = listenToMusic(driver);
        const readNews = new ReadNewsController(driver);
        const searchNewsBy = readNews.search.bind(readNews);
        const selectOneToRead = readNews.selectOneToRead.bind(readNews);

        contextBridge.exposeInMainWorld("electron", {
          backgroundListen: beacon.backgroundListen.bind(beacon),
          stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
          beaconVolume,
          listenToMusic: listenToMusicWithDriver,
          readNews: { searchNewsBy, selectOneToRead },
          getAudioDevices,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
