/* eslint-disable @typescript-eslint/no-var-requires */
const executeException = require("./situation_except");
const { By, Builder } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

async function listenToMusic(driver) {
  let platformName = null;
  let songName = null;

  async function exit() {
    await driver.quit();
  }

  async function searchSong(newSongName) {
    songName = newSongName;
  }

  async function playOnYoutube() {
    try {
      platformName = "youtube";
      const url = `https://yewtu.be/search?q=${songName}`;
      await driver.get(url);

      const songList = await driver.findElements(
        By.className("video-card-row")
      );
      if (songList.length > 0) {
        await driver.sleep(1000);
        await songList[0].click();
      } else {
        throw new Error("Không tìm thấy bài hát trên YouTube");
      }
    } catch (error) {
      console.error("Lỗi xảy ra khi phát nhạc trên YouTube:", error);
      executeException("listenToMusicYoutube");
    }
  }

  async function playOnMp3() {
    try {
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
    } catch (error) {
      console.error("Lỗi xảy ra khi phát nhạc trên Mp3:", error);
      executeException("listenToMusicMp3");
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

listenToMusic(driver).then((res) => {
  res.searchSong("fnwenwenfoewnfweo");
  res.playOnMp3();
});

module.exports = listenToMusic;
