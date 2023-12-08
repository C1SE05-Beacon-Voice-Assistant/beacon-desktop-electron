/* eslint-disable @typescript-eslint/no-var-requires */
const { textToSpeech } = require("./beacon_speech.js");
const { guide } = require("./helpers/guide");

class UserManual {
  constructor(BeaconSpeech) {
    this.beacon = BeaconSpeech;
  }

  async readIntroduction() {
    await textToSpeech(guide.introduction);
  }

  async readRequirements() {
    await textToSpeech(guide.requirements);
  }

  async readFull() {
    for (var key in guide) {
      await textToSpeech(guide[key]);
    }
  }

  async readMusic() {
    await textToSpeech(guide.play_music);
  }

  async readVolume() {
    await textToSpeech(guide.control_vol);
  }

  async readNews() {
    await textToSpeech(guide.read_news);
  }

  async start() {
    let options = `
        Bạn muốn tôi hướng dẫn sử dụng cho chức năng nào? (Vui lòng đọc số thứ tự để chọn)
        1. Giới thiệu về ứng dụng
        2. Hướng dẫn chức năng đọc tin tức
        3. Hướng dẫn chức năng phát nhạc
        4. Hướng dẫn chức năng điều chỉnh âm lượng máy tính
        5. Đọc toàn bộ hướng dẫn
        0. Kết thúc đọc hướng dẫn
    `;

    while (true) {
      await textToSpeech(options);
      const input = await this.beacon.recognizeFromMicrophone();
      const optionChosen = input.match(/[0,9]/);

      if (!optionChosen) {
        await textToSpeech("Lựa chọn không hợp lệ");
        continue;
      }

      switch (optionChosen) {
        case 1: {
          await this.readIntroduction();
          break;
        }
        case 2: {
          await this.readNewsByType();
          break;
        }
        case 3: {
          await this.readMusic();
          break;
        }
        case 4: {
          await this.readVolume();
          break;
        }
        case 5: {
          await this.readFull();
          break;
        }
        case 0:
          return;
      }
    }
  }
}

module.exports = UserManual;
