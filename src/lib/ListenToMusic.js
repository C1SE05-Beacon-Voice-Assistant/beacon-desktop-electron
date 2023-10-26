const By = window.electron.By;

class ListenToMusic {
  driver;
  platformName = null;
  songName = null;

  constructor() {
    this.driver = window.electron.initDriver();
  }

  // exit
  async exit() {
    await this.driver.quit();
  }

  async searchSong(songName) {
    this.songName = songName;
  }

  playOnYoutube() {
    this.platformName = "youtube";
    const url = `https://yewtu.be/search?q=${this.songName}`;
    this.driver.get(url).then(async () => {
      const songList = await this.driver.findElements(
        By.className("video-card-row")
      );
      if (songList.length > 0) {
        await this.driver.sleep(1000);
        await songList[0].click();
      }
    });
  }

  playOnMp3() {
    this.platformName = "mp3";
    return new Promise((resolve, reject) => {
      const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${this.songName}`;
      this.driver
        .get(url)
        .then(async () => {
          const show_play_buttons = await this.driver.findElements(
            By.css("div.zm-carousel-item")
          );
          if (show_play_buttons.length > 0) {
            await this.driver.sleep(1000);
            await show_play_buttons[0].click();
            const play_button = await this.driver.findElements(
              By.css("button.action-play")
            );
            if (play_button.length > 0) {
              await this.driver.sleep(1000);
              await play_button[0].click();
              resolve("Done");
            } else {
              reject("No play button found");
            }
          }
        })
        .catch((err) => {
          console.log("error: " + err);
          // this.playOnYoutube();
        });
    });
  }

  async toggle(isPlay = false) {
    if (this.platformName === "mp3") {
      const mp3_pause_button = await this.driver.findElement(
        By.css(`i.ic-${isPlay ? "play" : "pause"}-circle-outline`)
      );
      await this.driver.sleep(1000);
      await mp3_pause_button.click();
    } else {
      const youtube_pause_button = await this.driver.findElement(
        By.tagName("video")
      );
      await this.driver.sleep(1000);
      await youtube_pause_button.click();
    }
  }

  async pause() {
    await this.toggle(false);
  }
  async resume() {
    await this.toggle(true);
  }

  async next() {
    if (this.platformName === "mp3") {
      const next_button = await this.driver.findElement(
        By.css("i.ic-skip-next")
      );
      await this.driver.sleep(1000);
      await next_button.click();
    } else {
      const next_button = await this.driver.findElement(
        By.css("a.ytp-next-button")
      );
      await this.driver.sleep(1000);
      await next_button.click();
    }
  }
}

export default ListenToMusic;
