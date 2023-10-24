/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder, By, until } = require("selenium-webdriver");
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
    this.autoDetectSourceLanguageConfig =
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(["vi-VN", "en-US"]);
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
    const speechRecognizer = new sdk.SpeechRecognizer(
      this.speechConfig,
      audioConfig,
      this.autoDetectSourceLanguageConfig
    );

    speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        // if result include "dừng" => stop
        let text = e.result.text.toLowerCase();
        if (text.includes("dừng")) {
          speechRecognizer.stopContinuousRecognitionAsync();
        } else if (text.includes("bài nhạc")) {
          const songName = text.split("bài nhạc")[1].trim();
          start(songName);
        }
      } else if (e.result.reason == sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      speechRecognizer.stopContinuousRecognitionAsync();
    };

    speechRecognizer.sessionStopped = (s, e) => {
      console.log("\nSession stopped event.");
      speechRecognizer.stopContinuousRecognitionAsync();
    };

    speechRecognizer.startContinuousRecognitionAsync();
  }
}

const beacon = new BeaconSpeech("Beacon", "Hanoi");
beacon.backgroundListen();

function start(songName) {
  const url = `https://www.youtube.com/results?search_query=${songName}`;
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
