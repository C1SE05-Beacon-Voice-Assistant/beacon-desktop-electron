try:
    from selenium.webdriver.common.by import By
    from selenium.webdriver.remote.webelement import WebElement
    from selenium.common.exceptions import NoSuchElementException
except ImportError:
    print("Error when import selenium")

from constants import NewsSearchType
from utils import NewsReader


class ReadNewsController:
    """
    This class provides methods to search and read news articles from vnexpress.net.
    """

    def __init__(self, driver=None):
        """
        Initializes the ReadNewsController class by creating a ChromeDriver instance and a NewsReader instance.
        """
        self.driver = driver
        self.news_reader = NewsReader()

    def _search_news(self, article: str):
        """
        Searches for news articles on vnexpress.net using the given article keyword.

        Args:
            article (str): The keyword to search for.

        Returns:
            A list of dictionaries containing the title, description, and URL of the found articles.
        """
        try:
            artc = f"https://timkiem.vnexpress.net/?q={0}".format(article)
            self.driver.get(artc)
            articles_list = self.driver.find_elements(
                By.XPATH, "//div[@id='result_search']/article[position()<4]"
            )
            result = []
            for a in articles_list:
                a_dict = self._get_news_item(a)
                result.append(a_dict)

            return result

        except Exception as e:
            print("Đã xảy ra lỗi khi tìm kiếm tin tức.")
            print(f"Thông báo lỗi: {str(e)}")
            return []

    def _read_news(self, url: str, title: str, description: str):
        """
        Reads the news article from the given URL and returns its content.

        Args:
            url (str): The URL of the news article.
            title (str): The title of the news article.
            description (str): The description of the news article.

        Returns:
            The content of the news article.
        """
        try:
            self.driver.get(url)
            news_content = self.news_reader.get_news_content(
                url=url, title=title, description=description
            )
            return news_content

        except Exception as e:
            print("Đã xảy ra lỗi khi đọc tin tức.")
            print(f"Thông báo lỗi: {str(e)}")
            return None

    def _get_news_item(self, item: WebElement):
        """
        Extracts the title, description, and URL of a news article from the given WebElement.

        Args:
            item (WebElement): The WebElement containing the news article.

        Returns:
            A dictionary containing the title, description, and URL of the news article.
        """
        try:
            title = item.find_element(By.CLASS_NAME, "title-news")
            title_text = title.text
            article_link = title.find_element(By.TAG_NAME, "a").get_attribute("href")
            description = item.find_element(By.CLASS_NAME, "description")
            span_text = description.find_elements(By.CLASS_NAME, "location-stamp")
            description_text = (
                description.text
                if len(span_text) == 0
                else description.text.replace(span_text[0].text, "", 1)
            )

            return {
                "title": title_text,
                "description": description_text,
                "url": article_link,
            }

        except NoSuchElementException as e:
            print("Không tìm thấy yếu tố trên trang.")
            print(f"Thông báo lỗi: {str(e)}")
            return None
        except Exception as e:
            print("Đã xảy ra lỗi không xác định.")
            print(f"Thông báo lỗi: {str(e)}")
            return None

    def _find_by_type(self, news_type: NewsSearchType):
        """
        Finds news articles of the given type on vnexpress.net.

        Args:
            news_type (NewsSearchType): The type of news articles to search for.

        Returns:
            A list of dictionaries containing the title, description, and URL of the found articles.
        """
        try:
            if news_type == NewsSearchType.LATEST:
                type_url = "https://vnexpress.net/tin-tuc-24h"
            elif news_type == NewsSearchType.HOTTEST:
                type_url = "https://vnexpress.net/tin-nong"
            elif news_type == NewsSearchType.MOST_READ:
                type_url = "https://vnexpress.net/tin-xem-nhieu"
            else:
                raise ValueError("Loại tin tức không hợp lệ.")

            self.driver.get(type_url)
            articles_list = self.driver.find_elements(
                By.XPATH, "//div[@id='automation_TV0']//article[position()<4]"
            )
            result = []
            for a in articles_list:
                a_dict = self._get_news_item(a)
                result.append(a_dict)
            return result

        except ValueError as ve:
            print(f"Lỗi: {ve}")
            return []
        except Exception as e:
            print("Đã xảy ra lỗi không xác định.")
            print(f"Thông báo lỗi: {str(e)}")
            return []

    def read_by_type(self):
        """
        Reads news articles of the selected type from vnexpress.net.
        """
        try:
            print(
                """Chọn loại tin tức mà bạn muốn đọc:
                          1. Tin mới nhất
                          2. Tin nóng trong ngày
                          3. Tin đọc nhiều nhất
                          4. Tìm kiếm tin tức theo từ khóa
                          5. Thoát"""
            )

            news_type = input("Lựa chọn: ")

            if news_type not in ["1", "2", "3", "4"]:
                raise ValueError(
                    "Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 4 hoặc 5 để thoát."
                )

            if news_type == "1":
                article_list = self._find_by_type(NewsSearchType.LATEST)
            elif news_type == "2":
                article_list = self._find_by_type(NewsSearchType.HOTTEST)
            elif news_type == "3":
                article_list = self._find_by_type(NewsSearchType.MOST_READ)
            else:
                keyword = input("Vui lòng nhập từ khóa muốn tìm kiếm: ")
                print(keyword)
                article_list = self._search_news(keyword)

            print("Sau đây là tin tức tìm kiếm được")
            for article in article_list:
                print(f"- {article.get('title')}")

            if len(article_list) < 1:
                print("Không tìm thấy bất kỳ tin tức nào.")
                return

            index = int(input("Nhập số từ (0-2) để chọn tin tức mà bạn muốn đọc: "))
            if not (0 <= index < len(article_list)):
                raise ValueError("Số nhập vào không hợp lệ.")

            selected_article = article_list[index]
            print(
                self._read_news(
                    url=selected_article["url"],
                    title=selected_article["title"],
                    description=selected_article["description"],
                )
            )

        except ValueError as ve:
            print(f"Lỗi: {ve}")
        except Exception as e:
            print("Đã xảy ra lỗi không xác định.")
            print(f"Thông báo lỗi: {str(e)}")


if __name__ == "__main__":
    read_news = ReadNewsController()
    # while True:
    #     query = input("Nhập từ khóa cần tìm kiếm: ")
    #     read_news.search_and_read_news(query)
    # read_news.search_and_read_news("Tử thi sông hồng")
    read_news.read_by_type()
