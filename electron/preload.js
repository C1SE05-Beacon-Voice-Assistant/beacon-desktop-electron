/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const { contextBridge } = require("electron");
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
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));
const { checkInternetConnection } = require(path.join(
  __dirname,
  "detect_internet_status.js"
));
const executeException = require(path.join(__dirname, "situation_except.js"));
const textToSpeech = require(path.join(__dirname, "text_to_speech.js"));
const { start, register } = require(path.join(__dirname, "start.js"));

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const beacon = new BeaconSpeech("Beacon", "Hanoi");

if (IS_PRODUCTION) {
  const serviceBuilder = new ServiceBuilder(chromedriverPath);
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(serviceBuilder)
    .build();
} else {
  const driver = new Builder().forBrowser("chrome").build();
}

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  keywordRecognize: beacon.keywordRecognize.bind(beacon),
  storeConversation,
  getAllConversations,
  clearConversations,
});
