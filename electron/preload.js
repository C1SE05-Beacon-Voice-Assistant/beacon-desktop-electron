/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { contextBridge, ipcRenderer } = require("electron");
const dotenv = require("dotenv");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

dotenv.config();

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
// beacon.backgroundListen();

function wakeUp() {
  const options = {
    mode: "text",
    pythonPath: "./beacon-package/venv39/Scripts/python.exe",
    pythonOptions: ["-u"], // get print results in real-time
    encoding: "utf8",
    scriptPath: "./beacon-package",
  };

  PythonShell.run("beacon_speech.py", options)
    .then((messages) => {
      console.log("messages: %j", messages);
    })
    .catch((err) => {
      console.log(err);
    });
}

contextBridge.exposeInMainWorld("electron", {
  wakeUp: wakeUp,
  recognizeFromMicrophone: beacon.recognizeFromMicrophone.bind(beacon),
});

let bridge = {
  updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
};

contextBridge.exposeInMainWorld("bridge", bridge);
