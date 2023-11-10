/* eslint-disable @typescript-eslint/no-var-requires */
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");
const textToSpeech = require("./text_to_speech");

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      "4d74b26c859a4d338226896369488f55",
      "southeastasia"
    );
    this.speechConfig.speechRecognitionLanguage = "vi-VN";
    this.speechRecognizer = new sdk.SpeechRecognizer(
      this.speechConfig,
      sdk.AudioConfig.fromDefaultMicrophoneInput(),
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(["vi-VN", "en-US"])
    );
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

  backgroundListen(callback) {
    let isSpeechDetected = false;

    // Set a timeout for 5 seconds
    const timeoutId = setTimeout(() => {
      if (!isSpeechDetected) {
        console.log(
          "No speech detected within 5 seconds. Stopping recognition."
        );
        this.speechRecognizer.stopContinuousRecognitionAsync();
      }
    }, 1000);

    this.speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
      // If speech is detected, set the flag to true
      isSpeechDetected = true;
    };

    this.speechRecognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        // If speech is recognized, clear the timeout
        clearTimeout(timeoutId);
        callback(e.result.text);
      } else if (e.result.reason === sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    this.speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason === sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      // Clear the timeout in case of cancellation
      clearTimeout(timeoutId);
      this.speechRecognizer.stopContinuousRecognitionAsync();
    };

    this.speechRecognizer.sessionStopped = (s, e) => {
      console.log("\nSession stopped event.");
      // Clear the timeout in case of session stop
      clearTimeout(timeoutId);
      this.speechRecognizer.stopContinuousRecognitionAsync();
      this.keywordRecognize();
    };

    this.speechRecognizer.startContinuousRecognitionAsync();
  }

  stopBackgroundListen() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }

  async keywordRecognize() {
    await textToSpeech("Nói hey bi cần để bắt đầu");
    const data = await PythonShell.run("keyword_recognition.py", options);
    if (data[0] == "Hey Beacon") {
      await textToSpeech("Tôi đây, bạn cần gì ạ?");
      return true;
    } else {
      return false;
    }
  }
}

module.exports = BeaconSpeech;
