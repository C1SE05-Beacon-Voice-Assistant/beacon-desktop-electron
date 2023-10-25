/* eslint-disable @typescript-eslint/no-var-requires */
// import { Browser } from "../lib";
const loudness = window.electron.loudness;

// const startDriver = async () => {
//   const driver = await new Browser("chrome");
//   return driver;
// };

// fake listen to music function
const listenToMusic = () => {
  console.log("Listening to music...");
};

// fake read news function
const readNews = () => {
  console.log("Reading news...");
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
  await window.electron.controlVolume(amount);
  return amount;
};

const handleInput = (input: string) => {
  const text = input.toLowerCase();
  if (
    (text.includes("lượng") || text.includes("thanh")) &&
    (text.includes("tăng") || text.includes("giảm"))
  ) {
    console.log("Handling volume control");
    // find number in string (only one number)
    const match = text.match(/\b(?:10|[1-9][0-9]|100)\b/i);
    const amount = parseInt(match[0], 10);
    controlVolume(amount);
  }
};

export { listenToMusic, readNews, controlVolume, handleInput };
