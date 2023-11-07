/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const { contextBridge, ipcRenderer } = require("electron");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const path = require("path");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
// const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
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
const { start } = require(path.join(__dirname, "start.js"));
const beacon = new BeaconSpeech("Beacon", "Hanoi");

const init = async () => {
  start()
    .then((res) => {
      if (res) {
        console.log("Enter name");
        const name = beacon.recognizeFromMicrophone();
        console.log(name);
      } else {
        console.log("exist");
      }
    })
    .then(() => {
      const driver = new Builder().forBrowser("chrome").build();

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
};

init();
