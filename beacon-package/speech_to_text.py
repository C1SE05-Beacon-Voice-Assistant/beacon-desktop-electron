import os
import time
from dotenv import load_dotenv
import threading
import speech_recognition as sr
from os import path

load_dotenv()


class BeaconSpeech:
    def __init__(self, name, location):
        self.name = name
        self.location = location
        self.recognizer = sr.Recognizer()

    def __str__(self):
        return f"BeaconSpeech(name={self.name}, location={self.location})"

    def recognize(self, audio, **kwargs):
        try:
            time_1 = time.time()
            # Whisper
            # text = self.recognizer.recognize_whisper(audio, language="vietnamese", model="small",   **kwargs)
            # Google
            # text = self.recognizer.recognize_google(audio, language="vi-VN")
            # Azure
            text = self.recognizer.recognize_azure(audio,
                                                   language="vi-VN",
                                                   key=os.getenv("SPEECH_KEY"),
                                                   location=os.getenv("SPEECH_REGION"))[0]
            time_2 = time.time()
            print("Recognizing..." + text)
            print("Time: " + str(time_2 - time_1) + "s")
            return text
        except sr.UnknownValueError:
            print("Could not understand audio")
            return None
        except sr.RequestError as e:
            print("Could not request results from OpenAI Whisper service; {0}".format(e))
            return None
        except sr.WaitTimeoutError:
            print("Timeout")
            return None

    def recognize_from_microphone(self):
        with sr.Microphone() as source:
            self.recognizer.adjust_for_ambient_noise(source)
            audio = self.recognizer.listen(source)

        return self.recognize(audio)

    def recognize_from_file(self, file_name):
        audio_file = path.join(path.dirname(path.realpath(__file__)), file_name)
        with sr.AudioFile(audio_file) as source:
            audio = self.recognizer.record(source)

        return self.recognize(audio)

    def background_listen(self):
        def listen_thread():
            while True:
                with sr.Microphone() as source:
                    try:
                        audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=5)
                        if audio:
                            text = self.recognizer.recognize_whisper(audio, language="vietnamese")
                            print("Recognized in background: " + text)
                    except sr.WaitTimeoutError:
                        pass  # Ignore timeouts and continue listening

        # Start a new thread for background listening
        listen_thread = threading.Thread(target=listen_thread, daemon=True)
        listen_thread.start()


if __name__ == '__main__':
    beacon = BeaconSpeech("Beacon", "Hanoi")
    print("Say something...")
    # beacon.background_listen()
    beacon.recognize_from_microphone()

    # Keep the main thread running
    # while True:
    #     time.sleep(1)
