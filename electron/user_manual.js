/* eslint-disable @typescript-eslint/no-var-requires */
const { guide } = require("./helpers/guide");
const { textToSpeech } = require("./beacon_speech.js");

class UserManual {
  constructor(beacon) {
    this.beacon = beacon;
  }

  async customRead(text) {
    return await textToSpeech(text, this.beacon);
  }

  async readIntroduction() {
    await this.customRead(guide.introduction);
  }

  async readRequirements() {
    await this.customRead(guide.requirements);
  }

  async readFull() {
    const keys = Object.keys(guide);
    const guides = [];
    for (let i = 0; i < keys.length; i++) {
      guides.push(guide[keys[i]]);
    }
    await this.customRead(guides.toString());
  }

  async readMusic() {
    await this.customRead(guide.play_music);
  }

  async readVolume() {
    await this.customRead(guide.control_vol);
  }

  async readNews() {
    await this.customRead(guide.read_news);
  }

  async start() {
    let options = `
        Dưới đây là hướng dẫn:
        Nếu muốn nghe giới thiệu về ứng dụng thì nói làm sao để biết về ứng dụng
        Nếu muốn nghe tin tức thì nói làm sao để nghe tin tức
        Nếu muốn nghe nhạc thì nói làm sao để nghe nhạc
        Nếu muốn điều chỉnh âm lượng thì nói làm sao để điều chỉnh âm lượng
        Nếu muốn đọc toàn bộ hướng dẫn thì nói làm sao để nghe toàn bộ hướng dẫn
    `;
    await this.customRead(options);
  }
}

module.exports = {
  UserManual,
};
