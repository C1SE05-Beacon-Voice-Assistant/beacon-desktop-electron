from sys import argv
import sys
import pprint
from controllers.listen_to_music_controller import ListenMusicController


def calc(text):
    """based on the input text, return the operation result"""
    try:
        return text
    except Exception as e:
        print(e)
        return 0.0


if __name__ == "__main__":
    # pprint.pprint(sys.path)
    # print(calc(argv[1]))
