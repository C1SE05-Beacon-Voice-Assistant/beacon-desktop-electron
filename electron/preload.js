/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const { contextBridge } = require("electron");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const path = require("path");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const { execute_intent } = require(path.join(__dirname, "execute_intent"));
// const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
// const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const controlVolume = require(path.join(__dirname, "control_volume.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
const { checkInternetConnection } = require(path.join(
  __dirname,
  "detect_internet_status.js"
));
const executeException = require(path.join(__dirname, "situation_except.js"));
const textToSpeech = require(path.join(__dirname, "text_to_speech.js"));
const serviceBuilder = new ServiceBuilder(chromedriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  // .setChromeService(serviceBuilder)
  .build();
// excute_intent("play_music", listenToMusic(driver));
// setTimeout(() => {
//   excute_intent("stop_content", listenToMusic(driver));
// }, 15000);

// const beaconVolume = createBeaconVolume().then((result) => result);
// const listenToMusicWithDriver = listenToMusic(driver);
const readNews = new ReadNewsController(driver);
// const searchNewsBy = readNews.search.bind(readNews);
// const selectOneToRead = readNews.selectOneToRead.bind(readNews);

execute_intent("search_news", "Phát hiện", readNews)
  // execute_intent("latest_news", "", readNews)
  .then((res) => execute_intent("read_news", "", readNews, res, 0))
  .then((res) => console.log(res));

// execute_intent("play_music", listenToMusic(driver));
const { start, register } = require(path.join(__dirname, "start.js"));

// const beacon = new BeaconSpeech("Beacon", "Hanoi");

// setTimeout(() => {
//   execute_intent("next_content", listenToMusic(driver));
// }, 20000);

// setTimeout(() => {
//   execute_intent("next_content", listenToMusic(driver));
// }, 20000);
// const { start, register } = require(path.join(__dirname, "start.js"));

// const beacon = new BeaconSpeech("Beacon", "Hanoi");

// process.env.API_URL = "http://localhost:8000/api";

const init = () => {
  checkInternetConnection(async (isConnected) => {
    if (!isConnected) {
      executeException("noInternet");
    }

    await textToSpeech("Xin chào, tôi là Beacon, tôi có thể giúp gì cho bạn?");
    start()
      .then(async (res) => {
        // if (res) {
        //   console.log("exist");
        //   return true;
        // } else {
        //   await textToSpeech("Hãy đăng ký thông tin của bạn");
        //   await textToSpeech("Nhập tên");
        //   const name = await beacon.recognizeFromMicrophone();
        //   await textToSpeech("Nhập số điện thoại");
        //   const phone = await beacon.recognizeFromMicrophone();
        //   const userInfo = {
        //     name,
        //     phone,
        //   };
        //   return register(userInfo);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// init();

// const serviceBuilder = new ServiceBuilder(chromedriverPath);
// const driver = new Builder()
//   .forBrowser("chrome")
//   .setChromeService(serviceBuilder)
//   .build();
// const beaconVolume = createBeaconVolume().then((result) => result);
// const listenToMusicWithDriver = listenToMusic(driver);
// const readNews = new ReadNewsController(driver);
// const searchNewsBy = readNews.search.bind(readNews);
// const selectOneToRead = readNews.selectOneToRead.bind(readNews);

// contextBridge.exposeInMainWorld("electron", {
//   backgroundListen: beacon.backgroundListen.bind(beacon),
//   stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
//   keywordRecognize: beacon.keywordRecognize.bind(beacon),
//   beaconVolume,
//   listenToMusic: listenToMusicWithDriver,
//   readNews: { searchNewsBy, selectOneToRead },
//   getAudioDevices,
// });
