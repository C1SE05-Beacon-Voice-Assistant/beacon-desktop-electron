import re
import time
import asyncio

from selenium.common import ElementNotInteractableException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from constants.platforms import Platforms


class ListenMusicController:
    """
    This class is responsible for controlling the music player. It can search for and play music from either mp3.zing.vn or YouTube.
    """

    def __init__(self, speech, search_type, is_check, driver=None):
        """
        Initializes the ListenMusicController class.

        Parameters:
        speech (str): The speech input from the user.
        search_type (str): The type of search to be performed. Either "mp3" or "youtube".
        is_check (bool): A flag indicating whether the music should be played or just searched for.
        """
        self.speech = speech
        self.driver = driver
        self.constants = Platforms()
        self.search_type = search_type
        self.is_check = is_check
        self.is_running_on_youtube = False

    def __del__(self):
        """
        Destructor method that quits the driver.
        """
        self.driver.quit()

    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        Exit method that quits the driver.
        """
        self.driver.quit()

    def __enter__(self):
        """
        Enter method that returns the instance of the class.
        """
        return self

    def __str__(self):
        """
        Returns a string representation of the class.
        """
        return f"{self.speech} {self.search_type} {self.is_check}"

    def listen_to_music(self):
        """
        Searches for and plays music based on the speech input and search type.
        """
        try:
            matches = re.findall(
                r"(?:bài|nhạc|bai|nhac|hát|hat)(.*)", self.speech, re.DOTALL
            )
            self.driver.get(
                self.constants.MP3_URL
                if self.search_type == self.constants.MP3_TYPE
                else self.constants.YOUTUBE_URL
            )
            if self.search_type == self.constants.MP3_TYPE:
                if len(matches) > 0:
                    content = [match.strip() for match in matches]
                    song_name = content[0]
                    self.search_on_mp3(song_name)
                else:
                    self.search_on_mp3(self.speech)
            else:
                self.search_on_youtube("Bài hát " + self.speech)
        except Exception as e:
            print(f"An error occurred: {e}")

    def search_on_youtube(self, song_name):
        """
        Searches for a song on YouTube.

        Parameters:
        song_name (str): The name of the song to search for.
        """
        self.search_type = self.constants.YOUTUBE_TYPE
        try:
            # redirect to YouTube and search song
            url = self.constants.YOUTUBE_URL + "results?search_query=" + song_name
            self.driver.get(url)
            time.sleep(2)
            # Find all song
            # <div class="stroke style-scope yt-interaction"></div>
            list_songs = self.driver.find_element(By.CSS_SELECTOR, "a#video-title")
            time.sleep(1)
            list_songs.click()
            skip_button = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "ytp-ad-skip-button-text"))
            )
            skip_button.click()
            self.is_running_on_youtube = True
        except ElementNotInteractableException:
            pass
        except Exception as e:
            print("Error")
            print(e)
            # self.driver.quit()

    def search_on_mp3(self, song_name):
        """
        Searches for a song on mp3.zing.vn.

        Parameters:
        song_name (str): The name of the song to search for.
        """
        self.search_type = self.constants.MP3_TYPE
        try:
            # redirect to mp3.zing.vn and search song
            # url = self.constants.MP3_URL + "/tim-kiem/bai-hat?q=" + song_name
            url = self.constants.MP3_URL + "tim-kiem/tat-ca?q=" + song_name
            self.driver.get(url)
            time.sleep(2)
            show_play_button = self.driver.find_elements(
                By.CSS_SELECTOR, "div.zm-carousel-item"
            )
            if len(show_play_button) > 0:
                show_play_button[0].click()
                time.sleep(1)
                play_button = self.driver.find_elements(
                    By.CSS_SELECTOR, "button.action-play"
                )
                if len(play_button) > 0:
                    play_button[0].click()
                    if not self.is_check:
                        pass
                    else:
                        self.driver.quit()

        except ElementNotInteractableException:
            if not self.is_running_on_youtube:
                self.driver.get(self.constants.YOUTUBE_URL)
            self.search_on_youtube(song_name)

        except Exception as e:
            print(e)
            self.driver.quit()

    def toggle_play(self):
        """
        Toggles pause or play depending on the search type.
        """
        if self.search_type == self.constants.MP3_TYPE:
            play_button = self.driver.find_element(
                By.CSS_SELECTOR, "i.ic-pause-circle-outline"
            )
            play_button.click()
        else:
            video_element = self.driver.find_element(By.CSS_SELECTOR, "video")
            video_element.click()


# Step 1 -> Check on mp3, if don't have that song -> open on YouTube
# Step 2 ->  Check on mp3, if have that song -> give to user choose the platform to play
# HOW TO RUN FOR STEP 1

if __name__ == "__main__":
    cmd = ListenMusicController("Bạn đời", "MP3", True)
    cmd.listen_to_music()
    while True:
        query = input("Enter your query: ")
        if query == "exit":
            break
        if query == "pause":
            cmd.toggle_play()
            continue
        if query == "play":
            cmd.toggle_play()
            continue
#
# HOW TO RUN FOR STEP 2
# if __name__ == "__main__":
#     # show options
#     print("1. Chơi trên Zing MP3 (nếu không có bài hát sẽ chuyển sang YouTube)")
#     print("2. Chơi trên YouTube")
#     print("3. Thoát")
#     option = input("Enter your option: ")
#     if option == "3":
#         exit(0)
#     if option == "1":
#         cmd = ListenMusicController("Anh nho em nguoi yeu cu", search_type=Constants.MP3_TYPE, is_check=True)
#     else:
#         cmd = ListenMusicController("Anh nho em nguoi yeu cu", search_type=Constants.YOUTUBE_TYPE, is_check=True)
#
#     cmd.listen_to_music()
#     while True:
#         query = input("Enter your query: ")
#         if query == "exit":
#             break
#         if query == "pause":
#             cmd.toggle_play()
#             continue
#         if query == "play":
#             cmd.toggle_play()
#             continue
