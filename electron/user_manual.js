/* eslint-disable @typescript-eslint/no-var-requires */
const { guide } = require("./helpers/guide");
const { textToSpeech, BeaconSpeech } = require("./beacon_speech.js");
const beacon = new BeaconSpeech("Beacon", "Hanoi");
class UserManual {
  constructor(beacon){
    this.beacon = beacon
  }
   async readIntroduction() {
    await textToSpeech(guide.introduction);
  }

   async readRequirements() {
    await textToSpeech(guide.requirements);
  }

   async readFull() {
    const keys = Object.keys(guide)
    const guides = []
    for (let i = 0; i < keys.length; i++) {
      guides.push(guide[keys[i]])
    }
    await textToSpeech(guides.toString())
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

    await textToSpeech(options);
    while (true) {
      try {
        let isExits = false
        let input = await this.beacon.recognizeFromMicrophone();
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
              isExits = true
              await this.readIntroduction();
              break;
            }
            case 2: {
              isExits = true
              await this.readNews()
              break;
            }
            case 3: {
              isExits = true
              await this.readMusic();
              break;
            }
            case 4: {
              isExits = true
              await this.readVolume();
              break;
            }
            case 5: {
              isExits = true
              await this.readFull();
              break;
            }
            case 0:
              return;
          }
          if(isExits) {
            break
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
