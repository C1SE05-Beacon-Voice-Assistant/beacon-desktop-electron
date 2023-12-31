/* eslint-disable @typescript-eslint/no-var-requires */
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");
const { speechConfigDefault } = require("./helpers/config");
const {
  TextSpeak: { OUT_LISTEN, ACTIVE },
} = require("./helpers/enum");
const loudness = require("loudness");

async function autoUnmute() {
  const mute = await loudness.getMuted();
  if (mute) await loudness.setMuted(false);
}
class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.callBotTime = 0;
    this.location = location;
    const { subscriptionKey, region, speechRecognitionLanguage } =
      speechConfigDefault;
    this.synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig());
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      subscriptionKey,
      region
    );
    this.speechConfig.speechRecognitionLanguage = speechRecognitionLanguage;
    // this.speechConfig.endpointId = endpointId;
    this.speechRecognizer = new sdk.SpeechRecognizer(
      this.speechConfig,
      sdk.AudioConfig.fromDefaultMicrophoneInput(),
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(["vi-VN", "en-US"])
    );
    this.recognizer = null;
    this.keywordRetryCount = 0; // Track the number of consecutive no matches
    this.keywordRetryLimit = 4; // Define the limit for consecutive no matches
    this.keywordRecognitionActive = false; // Flag to track keyword recognition state
    this.isSpeechSynthesisActive = false;
  }

  recognize(audioConfig) {
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
    console.log("Say something...");
    return new Promise((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
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

  backgroundListen(callback, showText) {
    if (!this.keywordRecognitionActive) {
      this.keywordRecognize();
    }

    this.speechRecognizer.recognizing = async (s, e) => {
      const result = e.result;
      if (
        result.reason === sdk.ResultReason.RecognizingSpeech &&
        result.text.toLowerCase() != "phẩy"
      ) {
        showText(result.text);
      }
    };

    this.speechRecognizer.recognized = async (s, e) => {
      const result = e.result;
      if (
        result.reason === sdk.ResultReason.RecognizedSpeech &&
        result.text.toLowerCase() != "phẩy."
      ) {
        showText(result.text);
        callback(result.text);
      } else if (result.reason === sdk.ResultReason.NoMatch) {
        console.log("NOMATCH part", this.keywordRetryCount);
        await this.handleNoMatch(); // Handle no match condition
      }
    };
  }

  stopBackgroundListen() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }

  async handleNoMatch() {
    if (this.isSpeechSynthesisActive) return;
    if (this.keywordRecognitionActive) {
      this.keywordRetryCount++;
      if (this.keywordRetryCount >= this.keywordRetryLimit) {
        this.keywordRecognitionActive = false;
        this.keywordRetryCount = 0;
        this.stopBackgroundListen();
        await textToSpeech(
          OUT_LISTEN[Math.floor(Math.random() * OUT_LISTEN.length)]
        );
        await this.keywordRecognize();
      }
    }
  }

  async keywordRecognize() {
    await textToSpeech(OUT_LISTEN[0]);
    const data = await PythonShell.run("keyword_recognition.py", options);
    if (data[0] == "Hey Beacon") {
      console.log("126", data[0]);
      await textToSpeech(ACTIVE[Math.floor(Math.random() * ACTIVE.length)]);
      if (this.callBotTime === 0) {
        await textToSpeech("Nói làm sao sử dụng  để nghe hướng dẫn từ bi cần");
        this.callBotTime++;
      }

      this.keywordRecognitionActive = true;
      this.keywordRetryCount = 0;
      this.speechRecognizer.startContinuousRecognitionAsync();
    } else {
      await textToSpeech("Tôi không nghe rõ, bạn có thể nói lại được không?");
    }
  }

  async textToSpeech(text) {
    await autoUnmute();
    if (!text || this.isSpeechSynthesisActive) return;
    if (!this.keywordRecognitionActive) return;
    this.stopBackgroundListen();
    this.isSpeechSynthesisActive = true;
    try {
      await new Promise((resolve, reject) => {
        this.synthesizer.speakTextAsync(
          text,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              const audioDuration = result.audioDuration / 10000000;
              setTimeout(() => {
                resolve();
              }, parseInt(audioDuration * 950));
            } else {
              reject(new Error(result.errorDetails));
            }
          },
          (err) => {
            console.trace("err - " + err);
            reject(err);
          }
        );
      });

      this.isSpeechSynthesisActive = false;
      this.speechRecognizer.startContinuousRecognitionAsync();
      // this.handleNoMatch();
    } catch (error) {
      console.error("Error:", error.message);
      this.isSpeechSynthesisActive = false;
    }
  }

  async stopTextToSpeech() {
    console.log("stopTextToSpeech");
    try {
      // Stop the speech synthesis
      this.synthesizer.close();

      // Reset the synthesizer
      this.synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig());

      this.isSpeechSynthesisActive = false;
    } catch (error) {
      console.error("Error while stopping text to speech:", error);
    }
  }
}

const createSpeechConfig = () => {
  const {
    subscriptionKey,
    region,
    speechRecognitionLanguage,
    speechSynthesisVoiceName,
  } = speechConfigDefault;
  const config = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
  config.speechRecognitionLanguage = speechRecognitionLanguage;
  config.speechSynthesisVoiceName = speechSynthesisVoiceName;
  return config;
};

const textToSpeech = async (text) => {
  await autoUnmute();
  if (!text) return;
  var synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig());

  try {
    await new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioDuration = result.audioDuration / 10000000;
            setTimeout(() => {
              resolve();
            }, parseInt(audioDuration * 950));
          } else {
            reject(new Error(result.errorDetails));
          }
          synthesizer.close();
          synthesizer = null;
        },
        (err) => {
          console.trace("err - " + err);
          synthesizer.close();
          synthesizer = null;
          reject(err);
        }
      );
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  BeaconSpeech,
  textToSpeech,
};
