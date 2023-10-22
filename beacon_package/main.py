import re
from sys import argv
import sys
import pprint
from controllers import (
    ListenMusicController,
    ReadNewsController,
    VolumeController,
    TextToSpeechController,
)

from utils.driver import ChromeDriver

driver = ChromeDriver().get_driver()

if __name__ == "__main__":
    # set utf-8 encoding
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stdin.reconfigure(encoding="utf-8")

    print("Beacon is running")
    if len(argv) < 2:
        print("Please enter feature")
        exit(1)

    read_news = ReadNewsController(driver=driver)
    volume_control = VolumeController()
    while True:
        try:
            # wait for user input
            query = input("Enter your query: ")
            # if query match "thoát", "dừng", "tắt":
            if query in ["thoát", "dừng", "tắt"]:
                print("Đã thoát")
                break
            # if query match "tăng", "giảm", "tắt":
            if query in ["tăng", "giảm"]:
                print("Tăng giảm âm lượng")
                volume_control.control_volume(query)
                continue
            # if query match "đọc", "đọc tin tức", "đọc báo":
            if query in ["đọc", "đọc tin tức", "đọc báo"]:
                print("Đọc tin tức")
                read_news.read_by_type()
                continue
            # if query match "chơi nhạc", "nghe nhạc":
            # if re.match(r"chơi nhạc|nghe nhạc", query):
            #     print("Chơi nhạc")
            #     listen_music = ListenMusicController(query, "MP3", True, driver=driver)
            #     listen_music.listen_to_music()
            #     continue

            if query == "play":
                print("Play")
                listen_music.toggle_play()
                continue

            if query == "pause":
                print("Pause")
                listen_music.toggle_play()
                continue

        except EOFError as e:
            print(e)
            # break

    # driver.quit()
    exit(0)
