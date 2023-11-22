const path = require("path");
const textToSpeech = require("./text_to_speech");
const guide = require(path.join(__dirname, "helpers/guide.js"));

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

  readSearchNews() {
    textToSpeech(guide.search_news);
  }

  readLatesNews() {
    textToSpeech(guide.latest_news);
  }

  readHottestNews() {
    textToSpeech(guide.hottest_news);
  }

  readMostReadNews() {
    textToSpeech(guide.most_read_news);
  }

  readChooseNews() {
    textToSpeech(guide.read_news);
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
        Bạn muốn đọc hướng dẫn cho chức năng nào? (Vui lòng đọc số thứ tự để chọn)
        1. Tìm kiếm tin tức theo từ khóa
        2. Tìm kiếm tin tức mới nhất
        3. Tìm kiếm tin tức nóng
        4. Tìm kiếm tin tức được đọc nhiều nhất
        5. Chọn tin tức trong danh sách được tìm kiếm
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
    textToSpeech(options);
    this.readMostReadNews();
  }
}

new UserManual().start();

module.exports = UserManual;
