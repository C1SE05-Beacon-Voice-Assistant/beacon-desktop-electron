import requests
from bs4 import BeautifulSoup

class NewsReader:
    def get_news_content(self, url: str):
        result = {
            "title": "",
            "description": "",
            "details": ""
        }

        try:
            response = requests.get(url)
            print(response.status_code)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                
                result["title"] = soup.find("title").text
                result["description"] = soup.find(class_ = "bm_h bm_J").text
                main_content = soup.find(class_ = "bm_Rn")
                
                p = main_content.find_all("p")

                content = []
                
                for item in p:
                    cl = item.attrs["class"]
                    if len(cl) == 1:
                        content.append(item.text)                
                
                result["details"] = "".join(content) or "Nội dung bài báo chỉ bao gồm hình ảnh hoặc video!"

            else:
                result["title"] = "Lỗi truy cập"
                result["description"] = "Không thể truy cập trang"
                result["details"] = "Đường dẫn không tồn tại"

        except requests.exceptions.ConnectionError:
            result["title"] = "Lỗi kết nối mạng"
            result["description"] = "Không thể truy cập trang"
            result["details"] = "Không tìm thấy kết nối mạng"
        except Exception as e:
            result["details"] = e 

        return result

if __name__ == "__main__":
    url = "https://baomoi.com/ton-that-lon-cua-tap-doan-quan-su-tu-nhan-wagner/c/47008160.epi"
    urlFail = "https://bamoi.com/some-article"
    news_reader = NewsReader()
    print(news_reader.get_news_content(url=url))
