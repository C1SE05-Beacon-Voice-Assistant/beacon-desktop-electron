const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { NewsTypes } = require("../constants/newsTypes");

class NewsReader {
    constructor() {}

    async textNews(mainContent) {
        const content = [];

        const p = mainContent.find("p").each((index, element) => {
            if (element.children.length > 1) {
                console.log(element);
            } else content.push(element.children[0].data);
        });
        // const p = mainContent.find("p");
        // console.log(p[0].children[0]);
        fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) =>
            console.log(err)
        );
        return content.join("");
    }

    async photoNews(mainContent) {
        const content = [];

        // mainContent.find("p").each((index, element) => {
        //     if (element.children.length > 1) {
        //         console.log(element.children);
        //     } else if (element.children.length == 1) {
        //         const data = element.children[0].data;
        //         if (!content.includes(data)) content.push(data);
        //     }
        // });

        const desc_cation = mainContent
            .find("div.desc_cation")
            .filter((index, element) => {
                if (index % 2 == 0) return element;
            });
        desc_cation.find("p").each((index, element) => {
            console.log(element.children);
            content.push(element.children[0].data);
        });

        fs.writeFile("electron/utils/news.txt", content.join("\n"), (err) =>
            console.log(err)
        );
        return content.join("");
    }

    async liveNews(url) {
        const html = await axios.default.get(url);
        const $ = await cheerio.load(html.data);
        const mainContent = $(`article.fck_detail`);
        return this.textNews(mainContent);
    }

    async getNewsContent(url) {
        const result = {
            title: "",
            description: "",
            category: "",
            type: "",
            content: "",
        };
        try {
            const html = await axios.default.get(url);
            const $ = cheerio.load(html.data);
            result.title = $(`meta[property="og:title"]`).attr("content");
            result.description = $(`meta[property="og:description"]`).attr(
                "content"
            );
            result.type = $(`meta[name="its_type"]`).attr("content");
            result.category = $(`meta[name="tt_site_id_detail"]`).attr(
                "catename"
            );
            const mainContent = $(".fck_detail");
            switch (result.type) {
                case NewsTypes.PHOTO:
                    result.content = await this.photoNews(mainContent);
                    break;
                case NewsTypes.TEXT:
                    result.content = await this.textNews(mainContent);
                    break;
                case NewsTypes.LIVE:
                    const tongThuatUrl = $(`a[title="Tổng thuật"]`).attr(
                        "href"
                    );
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
            // console.log(mainContent);
        } catch (err) {
            console.log(err.response.status);
            console.log(err.response.statusText);
        }
        return result;
    }
}

const url =
    "https://vnexpress.net/suat-an-32-000-dong-cua-truong-yen-nghia-day-dan-hon-4668689.html";
const photoUrl =
    "https://vnexpress.net/can-ho-ap-mai-2-tang-co-quay-bar-san-vuon-4660398.html";
const urlLive = "https://vnexpress.net/asiad-ngay-4-10-4660546.html";
const urlFail = "https://vnexpress.net/asiad-ngay-4--46606.html";

new NewsReader().getNewsContent(urlFail).then((res) => {
    console.log(res);
});

module.exports = NewsReader;
