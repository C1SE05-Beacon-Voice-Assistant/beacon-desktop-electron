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
  await window.electron.controlVolume(amount);
  return amount;
};

const handleInput = async (
  input: string,
  currCommand: "news" | "music" | "volume" | null,
  resultNews: any[] = []
) => {
  let currentCommand = currCommand;
  const text = input.toLowerCase();
  console.log("Handling input: ", text);

  const listen = await window.electron.listenToMusic();
  const read = await window.electron.readNews();

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
      currentCommand = "volume";
      console.log("Handling volume control");
      const match = text.match(/\b(?:10|[1-9][0-9]|100)\b/i);
      const amount = parseInt(match[0], 10);
      controlVolume(amount);
    }
  } else {
    for (const command in musicCommands) {
      if (musicCommands[command as keyof typeof musicCommands].test(text)) {
        currentCommand = "music";
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
  let result: any[] = resultNews;
  if (newsMatch && currentCommand !== "news") {
    result = await read.search(SearchNewsBy.LATEST);
    for (let i = 0; i < result.length; i++) {
      console.log(`${i}. ${result[i].title}`);
    }
    currentCommand = "news";
  }
  console.log(currentCommand, result);

  if (currentCommand === "news" && result.length > 0) {
    // found number in text
    const match = text.match(/\b(?:10|[1-9][0-9]|100)\b/i);

    if (match) {
      const index = parseInt(match[0], 10);
      if (index < result.length && index >= 0) {
        await read.getNewsContent(
          result[index].url,
          result[index].title,
          result[index].description
        );
      } else {
        console.log("Không tìm thấy tin tức");
      }
    }
  }
  console.log("Result: ", result);
  console.log("Current command: ", currentCommand);

  return {
    command: currentCommand,
    result: result,
  };
};

export { controlVolume, handleInput };
