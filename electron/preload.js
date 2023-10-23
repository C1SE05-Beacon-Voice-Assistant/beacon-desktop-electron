/* eslint-disable @typescript-eslint/no-var-requires */
const {
  Builder,
  By,
  until,
  WebElementCondition,
} = require("selenium-webdriver");
const { contextBridge } = require("electron");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      "3d1916eed11c4c2d9be246152c2e5cd1",
      "southeastasia"
    );
    this.speechConfig.speechRecognitionLanguage = "vi-VN";
  }

  recognize(audioConfig) {
    const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
    console.log("Say something...");
    return new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            console.log("Recognizing..." + result.text);
            resolve(result.text);
          } else {
            console.log("Could not recognize speech");
            resolve(null);
          }
        },
        (error) => {
          console.log("Error: " + error);
          reject(error);
        }
      );
    });
  }

  async recognizeFromMicrophone() {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    return this.recognize(audioConfig);
  }

  recognizeFromFile(file) {
    const audioConfig = sdk.AudioConfig.fromWavFileInput(file);
    return this.recognize(audioConfig);
  }

  backgroundListen() {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

    recognizer.recognized = (_, result) => {
      console.log("Recognized in background: " + result.text);
    };

    recognizer.startContinuousRecognitionAsync();

    // To stop background listening, call recognizer.stopContinuousRecognitionAsync()
  }
}

const beacon = new BeaconSpeech("Beacon", "Hanoi");

function start(url) {
  const driver = new Builder().forBrowser("chrome").build();

  driver
    .get(url)
    .then(() => driver.findElement(By.id("video-title")))
    .then((el) => el.click())
    .then(() =>
      driver.wait(
        until.elementLocated(By.css(".ytp-ad-skip-button-icon")),
        20000
      )
    )
    .then((el) => {
      console.log(el);
      return el.click();
    });
}

contextBridge.exposeInMainWorld("electron", {
  recognizeFromMicrophone: beacon.recognizeFromMicrophone.bind(beacon),
  start,
});
