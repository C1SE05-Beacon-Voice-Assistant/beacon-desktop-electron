/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
// const { contextBridge } = require("electron");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const path = require("path");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const { excute_intent } = require("./excute_intent");
// const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
// const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const controlVolume = require(path.join(__dirname, "control_volume.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
// const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
// const { checkInternetConnection } = require(path.join(
//   __dirname,
//   "detect_internet_status.js"
// ));

const readNews = new ReadNewsController(driver);
const serviceBuilder = new ServiceBuilder(chromedriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeService(serviceBuilder)
  .build();



excute_intent("play_music", listenToMusic(driver));

setTimeout(() => {
  excute_intent("next_content", listenToMusic(driver));
}, 20000);

// const beaconVolume = createBeaconVolume().then((result) => result);
// const listenToMusicWithDriver = listenToMusic(driver);
// const readNews = new ReadNewsController(driver);
// const searchNewsBy = readNews.search.bind(readNews);
// const selectOneToRead = readNews.selectOneToRead.bind(readNews);
// a
// contextBridge.exposeInMainWorld("electron", {
// backgroundListen: beacon.backgroundListen.bind(beacon),
// stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
// beaconVolume,
// listenToMusic: listenToMusicWithDriver,
// readNews: { searchNewsBy, selectOneToRead },
// getAudioDevices,
// });
