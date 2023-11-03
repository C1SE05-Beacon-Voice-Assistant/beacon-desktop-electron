import re
import sys
from browser import document
from controllers import (
    ListenMusicController,
    ReadNewsController,
    VolumeController,
    TextToSpeechController,
)

from utils.driver import ChromeDriverCustom


def main(query_input: str):
    print("Bắt đầu chạy chương trình")
    driver = ChromeDriverCustom().start()
    print("Chạy xong driver")

    input_str = query_input
    while True:
        try:
            if re.search(r"nghe nhạc", input_str):
                print("Nghe nhạc")
                cmd = ListenMusicController(
                    speech=input_str, search_type="MP3", is_check=True, driver=driver
                )
                cmd.listen_to_music()
            elif re.search(r"đọc báo", input_str):
                print("Đọc báo")
                read_news = ReadNewsController(driver=driver)
                read_news.read_by_type()

            # elif re.search(r"tăng âm lượng", query):
            #     VolumeController().run(driver)
            # elif re.search(r"đọc văn bản", query):
            #     TextToSpeechController().run(driver)
            else:
                print("Không có chức năng này")

            input_str = input("Nhập câu lệnh: ")
            # wait for user input
            if input_str == "dừng":
                break

        except EOFError as e:
            print("Lỗi: ", e)
            break
        except ValueError as e:
            print("Lỗi giá trị: ", e)
            break
        except TypeError as e:
            print("Lỗi kiểu dữ liệu: ", e)
            break

    driver.quit()


def click(ev):
    query = document["zone"].value
    if query:
        main(query)


# bind event 'click' on button to callback function
document["echo"].bind("click", click)


# if __name__ == "__main__":
#     # set utf-8 encoding
#     sys.stdout.reconfigure(encoding="utf-8")
#     sys.stdin.reconfigure(encoding="utf-8")
#     sys.stdout.flush()
#     print(len(argv))
#     if len(argv) > 1:
#         query = argv[1]
#         print("Câu lệnh: ", query)
#         main(query)
#     else:
#         print("Vui lòng nhập câu lệnh")
#         exit(1)
