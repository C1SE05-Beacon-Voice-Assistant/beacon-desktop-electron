const path = require("path");
const textToSpeech = require("./text_to_speech");
const guide = require(path.join(__dirname, "helpers/guide.js"));

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
      // console.log(guide[key]);
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
      const index = input.match(/[0,9]/);

      if (!optionChoosen) {
        await textToSpeech("Lựa chọn không hợp lệ");
        continue;
      }

      switch (index) {
        case 1:
          await this.readIntroduction();
        case 2:
          await this.readNewsByType();
        case 3:
          await this.readMusic();
        case 4:
          await this.readVolume();
        case 5:
          await this.readFull();
        case 0:
          return;
      }
    }
  }
}

// new UserManual().start();

module.exports = UserManual;
