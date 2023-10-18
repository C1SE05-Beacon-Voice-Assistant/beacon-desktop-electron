from sys import argv
import sys
import pprint
from controllers import ListenMusicController, ReadNewsController, VolumeController


def calc(text):
    """based on the input text, return the operation result"""
    try:
        return text
    except Exception as e:
        print(e)
        return 0.0


if __name__ == "__main__":
    pprint.pprint(sys.path)
    # cmd = ListenMusicController("Bạn đời", "MP3", True)
    # cmd.listen_to_music()
    # while True:
    #     query = input("Enter your query: ")
    #     if query == "exit":
    #         break
    #     if query == "pause":
    #         cmd.toggle_play()
    #         continue
    #     if query == "play":
    #         cmd.toggle_play()
    #         continue

    # read_news = ReadNewsController()
    # read_news.read_by_type()

    # speech = 'Tôi muốn đặt âm lượng ở mức 31'
    # volume_control = VolumeController()
    # volume_control.control_volume(speech)
    # print(calc(argv[1]))
