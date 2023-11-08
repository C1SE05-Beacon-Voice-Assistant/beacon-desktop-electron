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
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const controlVolume = require(path.join(__dirname, "control_volume.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
const textToSpeech = require(path.join(__dirname, "text_to_speech.js"));
const serviceBuilder = new ServiceBuilder(chromedriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeService(serviceBuilder)
  .build();

execute_intent("play_music", listenToMusic(driver));

setTimeout(() => {
  execute_intent("next_content", listenToMusic(driver));
}, 20000);

// const beaconVolume = createBeaconVolume().then((result) => result);
// const listenToMusicWithDriver = listenToMusic(driver);
const readNews = new ReadNewsController(driver);
// const searchNewsBy = readNews.search.bind(readNews);
// const selectOneToRead = readNews.selectOneToRead.bind(readNews);

// const init = async () => {
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
//     });
// };

// init();
