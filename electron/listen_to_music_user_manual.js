const path = require("path");
const textToSpeech = require("./text_to_speech");
const guide = require(path.join(__dirname, "helper/listen_to_music_guide.js"));

class UserManual {
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

  play_music() {
    textToSpeech(guide.play_music);
  }

  stop_content() {
    textToSpeech(guide.stop_content);
  }

  resume_content() {
    textToSpeech(guide.resume_content);
  }

  increase_volume() {
    textToSpeech(guide.increase_volume);
  }

  decrease_volume() {
    textToSpeech(guide.decrease_volume);
  }
  min_volume() {
    textToSpeech(guide.min_volume);
  }
  max_volume() {
    textToSpeech(guide.max_volume);
  }
  mute() {
    textToSpeech(guide.mute);
  }
  un_mute() {
    textToSpeech(guide.un_mute);
  }
  set_volume() {
    textToSpeech(guide.set_volume);
  }
  next_content() {
    textToSpeech(guide.next_content);
  }

  start() {
    let options = `
    Bạn muốn làm gì với chức năng nghe nhạc? (Vui lòng đọc số thứ tự để chọn)
    1. Phát nhạc
    2. Dừng nội dung
    3. Tiếp tục nội dung
    4. Tăng âm lượng
    5. Giảm âm lượng
    6. Âm lượng nhỏ nhất
    7. Âm lượng lớn nhất
    8. Tắt tiếng
    9. Bật tiếng
    10. Đặt âm lượng
    11. Nội dung tiếp theo
    0. Kết thúc đọc hướng dẫn
  `;
    textToSpeech(options);
    this.readMostReadNews();
  }
}

// new UserManual().start();

module.exports = UserManual;
