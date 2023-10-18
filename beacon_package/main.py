from sys import argv
import sys
import pprint
from controllers import ListenMusicController, ReadNewsController


def calc(text):
    """based on the input text, return the operation result"""
    try:
        return text
    except Exception as e:
        print(e)
        return 0.0


if __name__ == "__main__":
    pprint.pprint(sys.path)
    # read_news = ReadNewsController()
    # read_news.read_by_type()
    # print(calc(argv[1]))
