/* eslint-disable @typescript-eslint/no-var-requires */
// import { Browser } from "../lib";

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
  await window.electron.controlVolume(amount);
  return amount;
};

const handleInput = async (input: string) => {
  const text = input.toLowerCase();
  console.log("Handling input: ", text);

  const listen = await window.electron.listenToMusic();

  const musicCommands = {
    search: /(bài hát|nhạc|bài nhạc)/,
    play: /(phát|chạy|play)/,
    resume: /(tiếp tục|resume)/,
    pause: /(dừng|pause)/,
    next: /(next|tiếp theo)/,
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
        } else if (command === "next") {
          await listen.next();
        }
        break; // Exit the loop once a music command is matched
      }
    }
  }

  if (newsMatch) {
    // Handle news-related action here
  }
};

export { controlVolume, handleInput };
