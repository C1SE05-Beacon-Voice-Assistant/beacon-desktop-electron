import sys
from flask import Flask
from flask_cors import cross_origin
from controllers import (
    ListenMusicController,
    ReadNewsController,
    VolumeController,
    TextToSpeechController,
)

from utils.driver import ChromeDriver

app = Flask(__name__)
driver = ChromeDriver().start_driver()


@app.route("/", methods=["GET"])
# @cross_origin()
def hello_world():
    return "Hello, World!"


@app.route("/stop", methods=["GET"])
# @cross_origin()
def stop_driver():
    driver.stop_driver()
    return "Stop driver"


@app.route("/listen_music/<query>", methods=["GET"])
# @cross_origin()
def listen_music(query):
    listen_music = ListenMusicController(
        speech=query, is_check=True, driver=driver, search_type="MP3"
    )
    listen_music.listen_to_music()
    return "Listen music"


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
