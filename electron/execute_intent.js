/* eslint-disable @typescript-eslint/no-var-requires */
const beaconVolume = require("./control_volume.js");
const listenToMusic = require("./listen_to_music.js");
const ReadNews = require("./read_news.js");
const gptGenerate = require("./gpt_generate.js");
const { TextSpeak } = require("./helpers/enum.js");
const { textToSpeech } = require("./beacon_speech.js");
const { SearchNewsBy } = require("./helpers/enum.js");
const {
  detectSpeakerDeviceIsMuting,
} = require("./detect_speaker_device_is_muting.js");

/**
 * @description handle output of intent
 * @param {string} label
 * @param {string} query
 * return *
 */
const handleOutput = (label, query) => {
  // change query to lowercase to standardlize the query
  // Bài báo != bài báo => to avoid this error scenario
  query = query.toLowerCase();
  // if label match volume, get number from query
  const matchVolume = label.match(/volume/gi) && query.match(/\d+/g);
  if (matchVolume) {
    return {
      label: label,
      query: parseInt(matchVolume[0]),
    };
  }

  // if label match music, get song name from query
  // example query: "phát nhạc bài hát đường tình đôi ngã" -> "đường tình đôi ngã"
  // example query: "Mở bài hát bạn ơi." -> "bạn ơi"
  // example query: "Mở bài bạn ơi" -> "bạn ơi"
  const matchMusic = label.match(/music/gi) && query.match(/(?<=bài hát ).*/gi);
  if (matchMusic) {
    return {
      label: label,
      query: matchMusic[0],
    };
  }

  // if label match news, get keyword from query
  // example query: "đọc tin tức về covid" -> "covid"
  // example query: "đọc tin tức số 2" -> "2"
  // example query: "tìm tin tức mới nhất" -> query: none
  const matchNews = /(tin tức|bản tin|thời sự|bài báo)/.test(query);
  if (matchNews) {
    if (label == "read_news") {
      query = query.replace(/một/, "1");
      query = query.replace(/hai/, "2");
      query = query.replace(/ba/, "3");
      query = query.match(/[1-3]/)[0];
      console.log("Chọn bài báo số: ", query);
      if (query.length == 0)
        throw Error(
          "Lựa chọn không hợp lệ, lựa chọn phải nằm trong khoảng (1-3)"
        );
    } else if (label == "search_news") {
      query = query.replace(/(tin tức|bản tin|thời sự)/, "").trim();
    }
    return {
      label: label,
      query: query,
    };
  }
};

const handleVolume = (query) => {
  // if label match volume, get number from query
  const matchVolume = query.match(/\d+/g);
  if (matchVolume) {
    return parseInt(matchVolume[0]);
  }
  return -1;
};

const handleMusic = (query) => {
  const matchMusic = query.match(/(?<=bài hát ).*/gi);
  if (matchMusic) {
    return matchMusic[0];
  }
  return "";
};

/**
 * @description get keyword from the command.
 * @example "Tìm kiếm cho tôi những bài báo về đại dịch covid" => "đại dịch covid"
 * @param {string} query
 * return {string}
 */
const handleSearchKey = (query) => {
  const pattern = /tin tức về|bài báo về|thời sự về|điểm báo về/;

  const match = query.match(pattern);
  let keyword = "";

  if (match) {
    const position = match.index;
    keyword = query.substring(position + match[0].length);

    console.log(keyword);
  }
  return keyword;
};

/**
 * @description get the first number in range[1-3] in a "Choose a news to read" command.
 * @example: "Đọc cho tôi tin tức số 2" => 2
 * @param {string} query
 * @return {number} index
 */
const handleReadNews = (query) => {
  // change query to lowercase to standardlize the query
  // Bài báo != bài báo => to avoid this error scenario
  query = query.toLowerCase();

  query = query.replace(/một/, "1");
  query = query.replace(/hai/, "2");
  query = query.replace(/ba/, "3");

  let index = query.match(/[1-3]/)[0];
  console.log("Chọn bài báo số: ", index);
  if (query.length == 0) index = -1;

  return index;
};

class ExecuteIntent {
  constructor(driver, userManual) {
    this.driver = driver;
    this.userManual = userManual;
    this.isReadManual = true;
  }
  async executeIntent(output, history, list) {
    await detectSpeakerDeviceIsMuting();
    const label = output.label;
    const query = output.query;
    const listenControl = await listenToMusic(this.driver);

    const readNewsControl = new ReadNews(this.driver);
    const volumeControl = await beaconVolume();
    const features = [
      {
        name: "user_manual",
        feature_name: async () => {
          const appIntroductionRegex = new RegExp("giới");
          const musicRegex = new RegExp("nhạc");
          const readNewsRegex = new RegExp("tin tức");
          const volumeRegex = new RegExp("âm");
          if (label) {
            if (musicRegex.test(query)) {
              await this.userManual.readMusic();
            } else if (readNewsRegex.test(query)) {
              await this.userManual.readNews();
            } else if (volumeRegex.test(query)) {
              await this.userManual.readVolume();
            } else if (appIntroductionRegex.test(query)) {
              console.log(appIntroductionRegex);
              await this.userManual.readIntroduction();
            } else {
              await this.userManual.start();
            }
          }
        },
      },
      {
        name: "play_music",
        feature_name: async () => {
          // const music = handleOutput(label, query);
          const music = handleMusic(query);
          if (music) {
            await listenControl.searchSong(music);
            await listenControl.playOnYoutube();
          }
        },
      },
      {
        name: "pause_content",
        feature_name: async () => listenControl.pause(),
      },
      {
        name: "stop_content",
        feature_name: async () => listenControl.stop(),
      },
      {
        name: "resume_content",
        feature_name: async () => listenControl.resume(),
      },
      {
        name: "increase_volume",
        feature_name: async () => {
          // const volume = handleOutput(label, query);
          const volume = handleVolume(query);
          if (volume) await volumeControl.increaseVolume(volume);
        },
      },
      {
        name: "decrease_volume",
        feature_name: async () => {
          // const volume = handleOutput(label, query);
          const volume = handleVolume(query);
          if (volume) await volumeControl.decreaseVolume(volume);
        },
      },
      {
        name: "min_volume",
        feature_name: async () => {
          await volumeControl.setVolumeToMin();
        },
      },
      {
        name: "max_volume",
        feature_name: async () => {
          await volumeControl.setVolumeToMax();
        },
      },
      {
        name: "mute",
        feature_name: async () => {
          // await volumeControl.mute();
        },
      },
      {
        name: "un_mute",
        feature_name: async () => {
          await volumeControl.unmute();
        },
      },
      {
        name: "set_volume",
        feature_name: async () => {
          const volume = handleOutput(label, query);
          if (volume) await volumeControl.setVolume(volume.query);
        },
      },
      // {
      //   name: "next_content",
      //   feature_name: async () =>
      //     object.then(async (res) => {
      //       await res.next();
      //     }),
      // },

      /**
       * Read news intent
       *
       */

      {
        name: "search_news",
        feature_name: async () => {
          // const searchKey = handleOutput(label, query).query;
          const searchKey = handleSearchKey(query);
          await textToSpeech(TextSpeak.SEARCHING);
          const data = await readNewsControl.searchByKeyword(searchKey);
          return { newsList: data };
        },
      },
      {
        name: "latest_news",
        feature_name: async () => {
          return {
            newsList: await readNewsControl.search(SearchNewsBy.LATEST),
          };
        },
      },
      {
        name: "most_read_news",
        feature_name: async () => {
          return {
            newsList: await readNewsControl.search(SearchNewsBy.MOST_READ),
          };
        },
      },
      {
        name: "breaking_news",
        feature_name: async () => {
          const newsList = await readNewsControl.search(SearchNewsBy.BREAKING);
          return {
            label: label,
            newsList,
          };
        },
      },
      {
        name: "read_news",
        feature_name: async () => {
          // const index = handleOutput(label, query)?.query;
          const index = handleReadNews(query);
          return readNewsControl.selectOneToRead(list, index - 1);
        }, //index start with 0
      },

      /**
       * User Manual intent
       *
       */

      // {
      //   name: "user_manual",
      //   feature_name: async () => object.start(),
      // },

      /**
       * GPT AI generate
       */
      {
        name: "gpt_ai",
        feature_name: async () => {
          const userData = {
            role: "user",
            content: query,
          };
          await textToSpeech(TextSpeak.SEARCHING);
          const data = await gptGenerate([...history, userData]);
          if (data) {
            await textToSpeech(data[0]);
          }
          return [
            userData,
            {
              role: "assistant",
              content: data[0],
            },
          ];
        },
      },
    ];

    for (let f of features) {
      if (f.name === label) {
        console.log("Execute feature: ", f.name);
        return f.feature_name();
      }
    }
  }
}

module.exports = ExecuteIntent;
