/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder, By, until } = require("selenium-webdriver");
const { contextBridge } = require("electron");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const loudness = require("loudness");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
require("dotenv").config();

const NewsTypes = {
  TEXT: "text",
  VIDEO: "video",
  PHOTO: "photo",
  INFOGRAPHIC: "infographic",
  LIVE: "live",
  PODCAST: "podcast",
};

const SearchNewsBy = {
  KEYWORD: "keyword",
  HOTTEST: "hottest",
  MOST_READ: "mostRead",
  LATEST: "latest",
};

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.SPEECH_KEY,
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
    this.speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    this.speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
        callback(e.result.text);
      } else if (e.result.reason == sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    this.speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      this.speechRecognizer.stopContinuousRecognitionAsync();
    };

    this.speechRecognizer.sessionStopped = (s, e) => {
      console.log("\nSession stopped event.");
      this.speechRecognizer.stopContinuousRecognitionAsync();
    };

    this.speechRecognizer.startContinuousRecognitionAsync();
  }

  stopBackgroundListen() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }
}

async function textNews(mainContent, $) {
  const content = [];
  const p = mainContent.find("p.Normal").filter((index, element) => {
    const e = $(element);
    if (!e.attr("style") && !e.attr("align")) {
      content.push(e.text());
      return element;
    }
  });
  fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) => {
    if (err) console.log(err);
  });
  return content.join("");
}

async function photoNews(mainContent) {
  const content = [];
  const desc_cation = mainContent
    .find("div.desc_cation")
    .filter((index, element) => {
      if (index % 2 === 0) return element;
    });
  desc_cation.find("p").each((index, element) => {
    content.push(element.children[0].data);
  });
  fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) =>
    console.log(err)
  );
  return content.join("");
}

async function liveNews(url) {
  const html = await axios.default.get(url);
  const $ = cheerio.load(html.data);
  const mainContent = $(`article.fck_detail`);
  return textNews(mainContent, $);
}

async function readNews() {
  async function getNewsInList(list) {
    try {
      const result = [];
      for (let item of list) {
        const title = await item
          .findElement(By.className("title-news"))
          .then((e) => e.getText());

        let description = await item
          .findElement(By.className("description"))
          .then((e) => e.getText());
        const url = await item
          .findElement(By.tagName("a"))
          .then((e) => e.getAttribute("href"));
        const spanText = await item.findElements(
          By.className("location-stamp")
        );
        console.log(spanText);
        description =
          spanText.length == 0
            ? description
            : description.replace(await spanText[0].getText(), "");
        result.push({ title, description, url });
      }
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function search(by) {
    let url = "";
    if (by === SearchNewsBy.HOTTEST) url = "https://vnexpress.net/tin-nong";
    else if (by === SearchNewsBy.LATEST)
      url = "https://vnexpress.net/tin-tuc-24h";
    else if (by === SearchNewsBy.MOST_READ)
      url = "https://vnexpress.net/tin-xem-nhieu";
    else
      throw new Error(
        `Không thể tìm kiếm tin tức theo ${by}, vui lòng thử lại`
      );

    driver.get(url);
    const articlesList = await driver.findElements(
      By.xpath(`//div[@id='automation_TV0']//article[position()<4]`)
    );
    const result = getNewsInList(articlesList);
    return result;
  }

  async function searchByKeyword(keyword) {
    const url = `https://timkiem.vnexpress.net/?q=${keyword}`;
    driver.get(url);
    const articlesList = await driver.findElements(
      By.xpath(`//div[@id='result_search']/article[position()<4]`)
    );
    return getNewsInList(articlesList);
  }

  async function getNewsContent(url, tit, des) {
    const result = {
      title: "",
      description: "",
      category: "",
      type: "",
      content: "",
    };

    try {
      const html = await axios.default.get(url);
      const $ = cheerio.load(html.data);
      result.title = tit ? tit : $(`meta[property="og:title"]`).attr("content");
      result.description = des
        ? des
        : $(`meta[property="og:description"]`).attr("content");
      result.type = $(`meta[name="its_type"]`).attr("content");
      result.category = $(`meta[name="tt_site_id_detail"]`).attr("catename");
      const mainContent = $(".fck_detail");
      switch (result.type) {
        case NewsTypes.PHOTO:
          result.content = await photoNews(mainContent);
          break;
        case NewsTypes.TEXT:
          result.content = await textNews(mainContent, $);
          break;
        case NewsTypes.LIVE:
          const tongThuatUrl = $(`a[title="Tổng thuật"]`).attr("href");
          console.log(tongThuatUrl);
          result.content = await liveNews(tongThuatUrl);
          break;
        case NewsTypes.PODCAST:
          result.content = "Đây là bản tin podcast";
          break;
        case NewsTypes.VIDEO:
        case NewsTypes.INFOGRAPHIC:
          result.content = "Đây là bản tin video";
          break;
      }
    } catch (err) {
      if (!err.response && !err.response.status) console.log(err);
      else if (err.response.status === 404)
        throw new Error("Lỗi không tìm thấy trang");
      else if (err.code === "ECONNREFUSED")
        throw new Error("Không có kết nối mạng");
      else if (err.response.status === 503)
        throw new Error("Mất quá nhiều thời gian để phản hồi");
      else throw Error("Server đang bị lỗi, vui lòng thử lại sau");
    }
    return result;
  }

  return {
    search,
    searchByKeyword,
    getNewsContent,
  };
}

async function listenToMusic() {
  let platformName = null;
  let songName = null;

  async function exit() {
    await driver.quit();
  }

  async function searchSong(newSongName) {
    songName = newSongName;
  }

  async function playOnYoutube() {
    platformName = "youtube";
    const url = `https://yewtu.be/search?q=${songName}`;
    await driver.get(url);

    const songList = await driver.findElements(By.className("video-card-row"));
    if (songList.length > 0) {
      await driver.sleep(1000);
      await songList[0].click();
    }
  }

  async function playOnMp3() {
    platformName = "mp3";
    const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${songName}`;

    await driver.get(url);

    const showPlayButtons = await driver.findElements(
      By.css("div.zm-carousel-item")
    );

    if (showPlayButtons.length > 0) {
      await driver.sleep(1000);
      await showPlayButtons[0].click();

      const playButton = await driver.findElements(
        By.css("button.action-play")
      );

      if (playButton.length > 0) {
        await driver.sleep(1000);
        await playButton[0].click();
        return "Done";
      } else {
        throw new Error("No play button found");
      }
    } else {
      throw new Error("No show play buttons found");
    }
  }

  async function toggle(isPlay = false) {
    if (platformName === "mp3") {
      const mp3PauseButton = await driver.findElement(
        By.css(`i.ic-${isPlay ? "play" : "pause"}-circle-outline`)
      );
      await driver.sleep(1000);
      await mp3PauseButton.click();
    } else {
      const youtubePauseButton = await driver.findElement(By.tagName("video"));
      await driver.sleep(1000);
      await youtubePauseButton.click();
    }
  }

  async function pause() {
    await toggle(false);
  }

  async function resume() {
    await toggle(true);
  }

  async function next() {
    if (platformName === "mp3") {
      const nextButton = await driver.findElement(By.css("i.ic-skip-next"));
      await driver.sleep(1000);
      await nextButton.click();
    } else {
      const nextButton = await driver.findElement(By.css("a.ytp-next-button"));
      await driver.sleep(1000);
      await nextButton.click();
    }
  }

  return {
    exit,
    searchSong,
    playOnYoutube,
    playOnMp3,
    pause,
    resume,
    next,
  };
}

function controlVolume(volume) {
  console.log(typeof volume);
  loudness
    .setVolume(volume)
    .then(() => console.log("Volume set to " + volume))
    .catch((err) => console.error(err));
}

const beacon = new BeaconSpeech("Beacon", "Hanoi");

const driver = new Builder().forBrowser("chrome").build();

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  controlVolume,
  listenToMusic,
  readNews,
});
