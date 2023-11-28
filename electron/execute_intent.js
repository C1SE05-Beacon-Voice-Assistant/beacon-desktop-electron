/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const beaconVolume = require("./control_volume.js");
const listenToMusic = require("./listen_to_music.js");
const { SearchNewsBy } = require("./helpers/enum.js");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

let driver;
// init driver
if (IS_PRODUCTION) {
  const serviceBuilder = new ServiceBuilder(chromedriverPath);
  driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(serviceBuilder)
    .build();
} else {
  driver = new Builder().forBrowser("chrome").build();
}

/**
 * @description handle output of intent
 * @param {string} label
 * @param {string} query
 * return *
 */
const handleOutput = (label, query) => {
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
};

const executeIntent = async (output, object, newsList = [], index = 0) => {
  const label = output.label;
  const query = output.query;
  const listenControl = await listenToMusic(driver);
  const volumeControl = await beaconVolume();
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
    {
      name: "next_content",
      feature_name: async () =>
        object.then(async (res) => {
          await res.next();
        }),
    },

    /**
     * Read news intent
     *
     */

    {
      name: "search_news",
      feature_name: async () => object.searchByKeyword(output),
    },
    {
      name: "latest_news",
      feature_name: async () => object.search(SearchNewsBy.LATEST),
    },
    {
      name: "most_read_news",
      feature_name: async () => object.search(SearchNewsBy.MOST_READ),
    },
    {
      name: "hottest_news",
      feature_name: async () => object.search(SearchNewsBy.MOST_READ),
    },
    {
      name: "read_news",
      feature_name: async () => object.selectOneToRead(newsList, index - 1), //index start with 0
    },

    /**
     * User Manual intent
     *
     */

    {
      name: "user_manual",
      feature_name: async () => object.start(),
    },
  ];
  // features.forEach(async (feature) => {
  //   if (feature.name === output_type) {
  //     await feature.feature_name();
  //   }
  // });
  for (let f of features) {
    if (f.name === label) return f.feature_name();
  }
};

module.exports = executeIntent;
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
