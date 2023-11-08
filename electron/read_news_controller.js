/* eslint-disable @typescript-eslint/no-var-requires */
// const { SearchNewsBy } = require("./helpers/enum.js");
const readline = require("readline");
const { promisify } = require("util");
const NewsReader = require("./helpers/newsReader.js");
const { By } = require("selenium-webdriver");
// const ChromeDriver = require("./helpers/driver.js");

const SearchNewsBy = {
  KEYWORD: "keyword",
  HOTTEST: "hottest",
  MOST_READ: "mostRead",
  LATEST: "latest",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionAsync = promisify(rl.question).bind(rl);

class ReadNewsController {
  constructor(chromeDriver) {
    this.driver = chromeDriver;
    this.newsReader = new NewsReader();
  }

  // constructor() {
  //   this.driver = new ChromeDriver().getInstance();
  //   this.newsReader = new NewsReader();
  // }

  async getNewsInList(list) {
    const result = [];

    for (let item of list) {
      try {
        const title = await item
          .findElement(By.className("title-news"))
          .getText();
        let description = await item
          .findElement(By.className("description"))
          .getText();
        const url = await item
          .findElement(By.tagName("a"))
          .getAttribute("href");

        const spanText = await item.findElements(
          By.className("location-stamp")
        );
        if (spanText.length > 0) {
          description = description.replace(await spanText[0].getText(), "");
        }

        result.push({ title, description, url });
      } catch (error) {
        console.error("An error occurred while processing an item:", error);
      }
    }

    return result;
  }

  async search(by) {
    let url = "";
    if (by === SearchNewsBy.HOTTEST) url = "https://vnexpress.net/tin-nong";
    else if (by === SearchNewsBy.LATEST)
      url = "https://vnexpress.net/tin-tuc-24h";
    else if (by === SearchNewsBy.MOST_READ)
      url = "https://vnexpress.net/tin-xem-nhieu";
    else
      throw new Error(
        `Không thể tìm kiếm tin tức theo ${by}, vui lòng thử lại`
      );

    await this.driver.get(url);
    const articlesList = await this.driver.findElements(
      By.xpath(`//div[@id='automation_TV0']//article[position()<4]`)
    );
    const result = await this.getNewsInList(articlesList);
    return result;
  }

  async searchByKeyword(keyword) {
    const url = `https://timkiem.vnexpress.net/?q=${keyword}`;
    await this.driver.get(url);
    const articlesList = await this.driver.findElements(
      By.xpath(`//div[@id='result_search']/article[position()<4]`)
    );
    return this.getNewsInList(articlesList);
  }

  async selectOneToRead(newsList, num) {
    await this.driver.get(newsList[num].url);
    const html = await this.driver.getPageSource();
    return this.newsReader.getNewsContent(
      html,
      newsList[num].title,
      newsList[num].description
    );
  }

  async start() {
    let result;
    try {
      const command =
        await questionAsync(`Chọn loại tin tức mà bạn muốn đọc(1-5):
            1. Tin mới nhất
            2. Tin nóng trong ngày
            3. Tin đọc nhiều nhất
            4. Tìm kiếm tin tức theo từ khóa
            5. Thoát\n`);
      switch (command) {
        case "1":
          result = await this.search(SearchNewsBy.LATEST);
          break;
        case "2":
          result = await this.search(SearchNewsBy.HOTTEST);
          break;
        case "3":
          result = await this.search(SearchNewsBy.MOST_READ);
          break;
        case "4": {
          let keyword = await questionAsync("Nhập keyword bạn muốn tìm:\n");
          result = await this.searchByKeyword(keyword);
          break;
        }
        case "5":
          return;
        default:
          throw Error("Vui lòng nhập đúng định dạng");
      }
      console.log("Sau đây là tin tức chúng tôi tìm được");
      for (let i = 0; i < result.length; i++) {
        console.log(`${i}. ${result[i].title}`);
      }
      let i = await questionAsync(
        `Vui lòng chọn 0-${result.length - 1} cho tin tức bạn muốn đọc:\n`
      );
      i = Number(i);
      if (i < 0 || i >= result.length)
        throw Error("Vui lòng chọn số thứ tự tin tức hợp lệ");
      await this.driver.get(result[i].url);
      const htmlSource = await this.driver.getPageSource();
      const tmp = await this.newsReader.getNewsContent(
        htmlSource,
        result[i].title,
        result[i].description,
        result[i].url
      );
      console.log(tmp);
    } catch (error) {
      console.log("152", error);
    } finally {
      rl.close();
    }
  }
}

// new ReadNewsController().start();

module.exports = ReadNewsController;
