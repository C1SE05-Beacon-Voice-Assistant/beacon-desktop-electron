/* eslint-disable @typescript-eslint/no-var-requires */
// import { Browser } from "../lib";
// const { SearchNewsBy } = require("../../electron/helpers/enum.js");
const SearchNewsBy = {
  KEYWORD: "keyword",
  HOTTEST: "hottest",
  MOST_READ: "mostRead",
  LATEST: "latest",
};

/**
 * Control volume on the computer
 * @param {string} direction - up or down
 * @param {number} amount - amount to increase or decrease volume by
 * @returns {void}
 * @example
 * controlVolume("up", 10);
 * controlVolume("down", 10);
 */

const controlVolume = async (
  amount: number,
  direction: "up" | "down" | "increase" | "decrease" = "up"
) => {
  const volume = await window.electron.beaconVolume;
  await volume.setVolume(amount);
  return amount;
};

const handleInput = async (
  input: string,
  currentCommand: string,
  resultNews: any[] = []
) => {
  const text = input.toLowerCase();
  console.log("Handling input: ", text);
  const listen = await window.electron.listenToMusic;
  const read = await window.electron.readNews;

  const musicCommands = {
    search: /(bài hát|nhạc|bài nhạc)/,
    play: /(phát|chạy|play)/,
    resume: /(tiếp tục|resume)/,
    pause: /(dừng|pause)/,
  };

  const newsMatch = /(tin tức|bản tin|thời sự)/.test(text);

  if (text.includes("lượng") || text.includes("thanh")) {
    if (text.includes("tăng") || text.includes("giảm")) {
      console.log("Handling volume control");
      const match = text.match(/\b(?:10|[1-9][0-9]|100)\b/i);
      const amount = parseInt(match[0], 10);
      controlVolume(amount);
    }
  } else {
    for (const command in musicCommands) {
      if (musicCommands[command as keyof typeof musicCommands].test(text)) {
        const songName = text
          .replace(musicCommands[command as keyof typeof musicCommands], "")
          .trim();
        if (command === "search") {
          await listen.searchSong(songName);
          await listen.playOnYoutube();
        } else if (command === "pause") {
          await listen.pause();
        } else if (command === "resume") {
          await listen.resume();
        }
        break; // Exit the loop once a music command is matched
      }
    }
  }

  let result: any[] = resultNews;
  if (newsMatch) {
    // Handle news-related action here
    if (result.length > 0) {
      // found number in text
      const match = text.match(/[0-2]/);

      if (match) {
        const index = parseInt(match.join(""));
        if (index < result.length && index >= 0) {
          const article = await read.getNewsContent(
            result[index].url,
            result[index].title,
            result[index].description
          );
          console.log(article);
        } else {
          console.log("Không tìm thấy tin tức");
        }
      }
    } else if (result.length == 0) {
      const regex = /(tin tức|bản tin|thời sự)/;
      // const keyword = text.split(regex);
      // result = await read.searchByKeyword(keyword[1]);
      result = await read.search(SearchNewsBy.HOTTEST);
      for (let i = 0; i < result.length; i++) {
        console.log(`${i}. ${result[i].title}`);
      }
      currentCommand = "news";
    }
  }

  return {
    command: currentCommand,
    result: resultNews,
  };
};

export { controlVolume, handleInput };
