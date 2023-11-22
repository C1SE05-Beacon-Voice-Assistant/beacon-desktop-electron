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

  start() {
    let options = `
        Bạn muốn đọc hướng dẫn cho chức năng nào? (Vui lòng đọc số thứ tự để chọn)
        1. Tìm kiếm tin tức theo từ khóa
        2. Tìm kiếm tin tức mới nhất
        3. Tìm kiếm tin tức nóng
        4. Tìm kiếm tin tức được đọc nhiều nhất
        5. Chọn tin tức trong danh sách được tìm kiếm
        0. Kết thúc đọc hướng dẫn
    `;
    textToSpeech(options);
    this.readMostReadNews();
  }
}

new UserManual().start();

module.exports = UserManual;
