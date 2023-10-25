const { Builder, By, until } = require("selenium-webdriver");
class Listen_to_music {
  constructor(songName) {
    this.songName = songName;
    this.driver = new Builder().forBrowser("chrome").build();
    this.flatformName = null;
  }
  async playOnYoutube() {
    this.flatformName = "youtube";
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
  async playOnMp3() {
    this.flatformName = "mp3";
    return new Promise(async (resolve, reject) => {
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
              resolve();
            } else {
              reject("No play button found");
            }
          }
        })
        .catch((err) => {
          console.log("error: " +err);
          // this.playOnYoutube();
        });
    });
  }
  async onPause(isPlay) {
    if (this.flatformName === "mp3") {
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
  onContinue() {
    this.onPause(true);
  }
}

const listen_to_music = new Listen_to_music("Em của ngày hôm qua");
try {
  listen_to_music
    .playOnMp3()
    .then(() => {
      const selected = 1;
      console.log("Choose 1 if u want play on YOUTUBE and else play on MP3");
      if (selected === 1) {
        listen_to_music.playOnYoutube();
      } else {
        listen_to_music.playOnMp3();
      }
      // When user say stop playing
      setTimeout(() => {
        listen_to_music.onPause();
        setTimeout(() => {
          listen_to_music.onContinue();
        }, 3000);
      }, 15000);
    })
    .catch(() => {
      // If not found that song on MP3, play it on YouTube
      listen_to_music.playOnYoutube();
    });
} catch (error) {
  console.log(error);
}
