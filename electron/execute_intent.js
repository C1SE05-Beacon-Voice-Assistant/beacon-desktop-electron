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

class ExecuteIntent {
  constructor(driver) {
    this.driver = driver;
  }
  async executeIntent(output, history, list) {
    await detectSpeakerDeviceIsMuting();
    const label = output.label;
    const query = output.query;
    const listenControl = await listenToMusic(this.driver);
    const readNewsControl = new ReadNews(this.driver);
    const volumeControl = await beaconVolume();

    console.log(output);

    const features = [
      {
        name: "play_music",
        feature_name: async () => {
          const music = handleOutput(label, query);
          if (music) {
            await listenControl.searchSong(music.query);
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
          const volume = handleOutput(label, query);
          if (volume) await volumeControl.increaseVolume(volume.query);
        },
      },
      {
        name: "decrease_volume",
        feature_name: async () => {
          const volume = handleOutput(label, query);
          if (volume) await volumeControl.decreaseVolume(volume.query);
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
          await volumeControl.mute();
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
          const searchKey = handleOutput(label, query);
          await textToSpeech(TextSpeak.SEARCHING);
          const data = await readNewsControl.searchByKeyword(searchKey);
          // if (data) {
          //   await textToSpeech(data);
          // }
          return { newsList: data };
        },
      },
      {
        name: "latest_news",
        feature_name: async () => {
          // const newsList = await readNewsControl.search(SearchNewsBy.LATEST);
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
          const index = handleOutput(label, query)?.query;
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
      if (f.name === label) return f.feature_name();
    }
  }
}

module.exports = ExecuteIntent;
// read_nnuews
// user_maal
// next_content
// pre_content
// end_of_content
// middle_of_content
// back
// up_to
// start_content
// stop_content
// restart_content
// pause_content
// resume_content
// your_choice
// increase_volume
// decrease_volume
// default_volume
// min_volume
// max_volume
// mute
// un_mute
// const features = [
//   {
//     name: '',
//     feature: ReadNewsController
//   }
// ]
//
