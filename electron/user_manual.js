/* eslint-disable @typescript-eslint/no-var-requires */
const { textToSpeech } = require("./beacon_speech.js");
const { guide } = require("./helpers/guide");
const { textToSpeech, BeaconSpeech } = require("./beacon_speech.js");
const beacon = new BeaconSpeech("Beacon", "Hanoi");
class UserManual {
  static async readIntroduction() {
    await textToSpeech(guide.introduction);
  }

  static async readRequirements() {
    await textToSpeech(guide.requirements);
  }

  static async readFull() {
    const keys = Object.keys(guide)
    const guides = []
    for (let i = 0; i < keys.length; i++) {
      guides.push(guide[keys[i]])
    }
    await textToSpeech(guides.toString())
  }

  static async readMusic() {
    await textToSpeech(guide.play_music);
  }

  static async readVolume() {
    await textToSpeech(guide.control_vol);
  }

  static async readNews() {
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

    await textToSpeech(options);
    while (true) {
      try {
        let input = await beacon.recognizeFromMicrophone();
        const result = input?.toLowerCase();
        switch (result) {
          case "một.":
            input = 1;
            break;
          case "hai.":
            input = 2;
            break;
          case "ba.":
            input = 3;
            break;
          case "bốn.":
            input = 4;
            break;
          case "năm.":
            input = 5;
            break;
        }
        if (input) {
          input = input?.split("")[0];
          console.log("input", input);
          const optionChosen = input.match(/^[0-9]$/);
          if (!optionChosen) {
            await textToSpeech("Lựa chọn không hợp lệ");
            continue;
          }

          switch (+optionChosen[0]) {
            case 1: {
              await UserManual.readIntroduction();
              break;
            }
            case 2: {
              await UserManual.readNews()
              break;
            }
            case 3: {
              await UserManual.readMusic();
              break;
            }
            case 4: {
              await UserManual.readVolume();
              break;
            }
            case 5: {
              await UserManual.readFull();
              break;
            }
            case 0:
              return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = {
  UserManual,
};
