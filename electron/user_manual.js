const path = require("path");
const textToSpeech = require("./text_to_speech");
const guide = require(path.join(__dirname, "helpers/guide.js"));

class UserManual {
  constructor(BeaconSpeech) {
    this.beacon = BeaconSpeech;
  }

  readIntroduction() {
    textToSpeech(guide.introduction);
  }

  readRequirements() {
    textToSpeech(guide.requirements);
  }

  readFull() {
    for (var key in guide) {
      console.log(guide[key]);
    }
  }

  readNews() {
    textToSpeech(guide.read_news);
  }

  async start() {
    let options = `
        Bạn muốn đọc hướng dẫn cho chức năng nào? (Vui lòng đọc số thứ tự để chọn)
        1. Giới thiệu về ứng dụng
        2. Đọc toàn bộ
        3. Cách sử dụng chức năng đọc tin tức
        
        6. Phát nhạc
        7. Dừng nội dung
        8. Tiếp tục nội dung
        9. Tăng âm lượng
        10. Giảm âm lượng
        11. Âm lượng nhỏ nhất
        12. Âm lượng lớn nhất
        13. Tắt tiếng
        14. Bật tiếng
        15. Đặt âm lượng
        16. Nội dung tiếp theo
        0. Kết thúc đọc hướng dẫn
    `;

    while (true) {
      await textToSpeech(options);
      const input = await this.beacon.recognizeFromMicrophone();
      const optionChoosen = input.match(/[0,9]/);

      if (!optionChoosen) {
        await textToSpeech("Lựa chọn không hợp lệ");
        continue;
      }

      const index = parseInt(optionChoosen);
      switch (index) {
        case 1:
          this.readIntroduction();
        case 2:
          this.readFull();
        case 3:
          this.readNewsByType();

        case 0:
          return;
      }
    }
  }
}

new UserManual().start();

module.exports = UserManual;
