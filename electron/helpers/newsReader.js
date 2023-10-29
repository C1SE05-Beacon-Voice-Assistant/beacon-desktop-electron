const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { NewsTypes } = require("./enum.js");

class NewsReader {
  constructor() {}

  async textNews(mainContent, $) {
    const content = [];
    const p = mainContent.find("p.Normal").filter((index, element) => {
      const e = $(element);
      if (!e.attr("style") && !e.attr("align")) {
        content.push(e.text());
        return element;
      }
    });
    // .each((index, element) => content.push($(element).text()));
    // fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) => {
    //   if (err) console.log(err);
    // });
    return content.join(" ");
  }

  async photoNews(mainContent) {
    const content = [];

    const desc_cation = mainContent
      .find("div.desc_cation")
      .filter((index, element) => {
        if (index % 2 == 0) return element;
      });
    desc_cation.find("p").each((index, element) => {
      content.push(element.children[0].data);
    });

    // fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) =>
    //   console.log(err)
    // );
    return content.join(" ");
  }

  async liveNews(url) {
    const html = await axios.default.get(url);
    const $ = await cheerio.load(html.data);
    const mainContent = $(`article.fck_detail`);
    return this.textNews(mainContent, $);
  }

  async getNewsContent(url, tit, des) {
    const result = {
      title: "",
      description: "",
      category: "",
      type: "",
      content: "",
    };
    console.log(des);
    try {
      const html = await axios.default.get(url);
      const $ = cheerio.load(html.data);
      result.title = tit ? tit : $(`meta[property="og:title"]`).attr("content");
      result.description = des
        ? des
        : $(`meta[property="og:description"]`).attr("content");
      result.type = $(`meta[name="its_type"]`).attr("content");
      result.category = $(`meta[name="tt_site_id_detail"]`).attr("catename");
      const mainContent = $(".fck_detail");
      switch (result.type) {
        case NewsTypes.PHOTO:
          result.content = await this.photoNews(mainContent);
          break;
        case NewsTypes.TEXT:
          result.content = await this.textNews(mainContent, $);
          break;
        case NewsTypes.LIVE:
          const tongThuatUrl = $(`a[title="Tổng thuật"]`).attr("href");
          console.log(tongThuatUrl);
          result.content = await this.liveNews(tongThuatUrl);
          break;
        case NewsTypes.PODCAST:
          result.content = "Đây là bản tin podcast";
          break;
        case NewsTypes.VIDEO:
        case NewsTypes.INFOGRAPHIC:
          result.content = "Đây là bản tin video";
          break;
      }
    } catch (err) {
      if (!err.response) console.log(err);
      if (err.response.status === 404)
        throw new Error("Lỗi không tìm thấy trang");
      else if (err.code === "ECONNREFUSED")
        throw new Error("Không có kết nối mạng");
      else if (err.response.status === 503)
        throw new Error("Mất quá nhiều thời gian để phản hồi");
      else throw new Error("Server đang bị lỗi, vui lòng thử lại sau");
    }
    return result;
  }
}

// const url =
//     "https://vnexpress.net/suat-an-32-000-dong-cua-truong-yen-nghia-day-dan-hon-4668689.html";
// const photoUrl =
//     "https://vnexpress.net/can-ho-ap-mai-2-tang-co-quay-bar-san-vuon-4660398.html";
const urlLive = "https://vnexpress.net/asiad-ngay-4-10-4660546.html";
// const urlFail = "https://vnexpress.net/asiad-ngay-4--46606.html";
// const photoMidu = "https://vnexpress.net/sac-voc-midu-o-tuoi-34-4661302.html";
const urlText = "https://vnexpress.net/muon-hoc-sinh-hanh-phuc-4669055.html";
const urlText2 =
  "https://vnexpress.net/van-mai-huong-toi-khong-may-man-chuyen-tinh-cam-4668697.html";

// new NewsReader().getNewsContent(urlText2).then((res) => {
//   console.log(res);
// });

module.exports = NewsReader;
