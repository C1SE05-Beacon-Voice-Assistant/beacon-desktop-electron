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
    print("Beacon is running")
    if len(argv) < 2:
        print("Please enter feature")
        exit(1)

    volume_control = VolumeController()
    while True:
        try:
            query = input("Enter command: ")
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
                read_news = ReadNewsController(driver=driver)
                read_news.read_by_type()
                continue
            # if query match "chơi nhạc", "nghe nhạc":
            if query in ["chơi nhạc", "nghe nhạc"]:
                print("Chơi nhạc")
                listen_music = ListenMusicController(query, "MP3", True, driver=driver)
                listen_music.listen_to_music()
                while True:
                    listen_query = input("Enter your query: ")
                    if listen_query == "exit":
                        break
                    if listen_query == "pause":
                        listen_music.toggle_play()
                        continue
                    if listen_query == "play":
                        listen_music.toggle_play()
                        continue
                continue            
        except EOFError as e:
            print(e)
            break

    exit(0)
