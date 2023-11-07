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
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));

const { start, register } = require(path.join(__dirname, "start.js"));
const beacon = new BeaconSpeech("Beacon", "Hanoi");

process.env.API_URL = "http://localhost:8000/api";

const serviceBuilder = new ServiceBuilder(chromedriverPath);
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeService(serviceBuilder)
  .build();

const init = async (driver) => {
  start()
    .then(async (res) => {
      // if (!res) {
      //   console.log("exist");
      //   return true;
      // } else {
      //   console.log("Enter name");
      //   const name = await beacon.recognizeFromMicrophone();
      //   console.log("Enter phone");
      //   const phone = await beacon.recognizeFromMicrophone();

      //   const userInfo = {
      //     name,
      //     phone,
      //   };

      //   return register(userInfo);
      // }
      return true;
    })
    .then((res) => {
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
        quitDriver: () => driver.quit(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

init(driver);

contextBridge.exposeInMainWorld("api", {
  receive: (channel, func) => {
    let quitChannel = ["before-quit"];
    console.log(quitChannel.includes(channel));
    if (quitChannel.includes(channel)) {
      console.log(driver);
      // driver.quit();
    }
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
