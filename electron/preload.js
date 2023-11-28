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
const { execute_intent } = require(path.join(__dirname, "execute_intent"));
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const controlVolume = require(path.join(__dirname, "control_volume.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));
const textToSpeech = require(path.join(__dirname, "text_to_speech.js"));
const intentRecognition = require(path.join(
  __dirname,
  "intent_recognition.js"
));
const UserManual = require(path.join(__dirname, "user_manual.js"));
const driver = new Builder().forBrowser("chrome").setChromeOptions().build();
const readNews = new ReadNewsController(driver);
const beacon = new BeaconSpeech("Beacon", "Hanoi");
const userManual = new UserManual(beacon);
// const { start, register } = require(path.join(__dirname, "start.js"));

// process.env.API_URL = "http://localhost:8000/api";

// const beaconVolume = createBeaconVolume().then((result) => result);
// const listenToMusicWithDriver = listenToMusic(driver);
// // const readNews = new ReadNewsController(driver);
// const searchNewsBy = readNews.search.bind(readNews);
// const selectOneToRead = readNews.selectOneToRead.bind(readNews);
// const searchKeyword = readNews.searchByKeyword.bind(readNews);

contextBridge.exposeInMainWorld("electron", {});
