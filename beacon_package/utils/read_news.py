import requests
from bs4 import BeautifulSoup, Tag


class NewsReader:
    def text_news(self, main_content: Tag):
        p = main_content.find_all("p")
        content = []

        for item in p:
            if len(item.find_all("a")):
                continue

            cl = item.attrs.get("class")
            sty = item.attrs.get("style")

            if cl is None or cl[0] != "Normal" or sty is not None:
                continue
            content.append(item.text)

        details = " ".join(content)
        return details

    def photo_news(self, main_content: Tag):
        p = main_content.find_all("p")
        content = []

        for item in p:
            cl = item.attrs.get("class")
            sty = item.attrs.get("style")
            # print(sty)
            text_string = item.text.split(".")
            print(text_string[-1])

            if cl is None or cl[0] != "Normal" or sty is not None:
                continue
            if "Ảnh: " in text_string[-1] or "Video: " in text_string[-1]:
                text_string.pop()
                text_string = " ".join(text_string)
                content.append(text_string)
            else:
                content.append(item.text)

        details = " ".join(content)
        return details

    def live_news(self, url: str):
        details = ""
        try:
            response = requests.get(url=url, allow_redirects=False)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                main_content = soup.find("article", class_="fck_detail")
                details = self.text_news(main_content)
            else:
                details = "Không tìm thấy trang"
        except requests.exceptions.ConnectionError:
            details = "Lỗi kết nối mạng"

        return details

    def get_news_content(self, url: str, title: str = None, description: str = None):
        result = {
          "title": "",
          "description": "",
          "details": "",
          "category": "",
          "type": ""
        }

        try:
            response = requests.get(url=url, allow_redirects=False)
            print(response.status_code)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                print(type(soup))

                result["title"] = (title if title is not None
                                   else soup.find("meta", attrs={"property": "og:title"})["content"])
                result["description"] = (description if description is not None
                                         else soup.find("meta", attrs={"property": "og:description"})["content"])
                result["type"] = soup.find("meta", attrs={"name": "its_type"})["content"]
                result["category"] = soup.find("meta", attrs={"name": "tt_site_id_detail"})["catename"]

                live_url = ""

                if result["type"] == "live":
                    live_url = soup.find("a", title="Tổng thuật")["href"]
                    result["details"] = self.live_news(live_url)
                elif result["type"] == "text":
                    main_content = soup.find("article", class_="fck_detail")
                    result["details"] = result["details"] = self.text_news(main_content)
                elif result["type"] == "photo":
                    main_content = soup.find("article", class_="fck_detail")
                    result["details"] = self.photo_news(main_content)
                elif result["type"] == "podcast":
                    result["details"] = "Đây là báo podcast"
                else:
                    result["details"] = "Đây là báo video"

            else:
                result["title"] = "Lỗi truy cập"
                result["description"] = "Không thể truy cập trang"
                result["details"] = "Đường dẫn không tồn tại"

        except requests.exceptions.ConnectionError:
            result["title"] = "Lỗi kết nối mạng"
            result["description"] = "Không thể truy cập trang"
            result["details"] = "Không tìm thấy kết nối mạng"
        except Exception as e:
            result["details"] = str(e)

        return result
