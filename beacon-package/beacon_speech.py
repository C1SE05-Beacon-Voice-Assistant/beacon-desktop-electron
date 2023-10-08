import os
import random
import re
import time

import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
from g4f import ChatCompletion, Provider

from utils import talk

load_dotenv()

SPEECH_KEY, SPEECH_REGION = os.getenv("SPEECH_KEY"), os.getenv("SPEECH_REGION")


def generate_gpt_response(messages):
    _providers = [
        Provider.Aivvm,
        Provider.Bing,
        Provider.ChatBase,
        Provider.Raycast,
        Provider.Liaobots,
    ]

    res = ChatCompletion.create(
        model="gpt-4",
        provider=Provider.Aivvm,
        messages=messages,
        stream=True,
    )

    result_str = []
    for mess in res:
        result_str.append(mess)

    # convert list to string
    result_str = "".join(result_str)
    # remove code block
    txt = result_str
    txt = re.sub(r"```[^\S\r\n]*[a-z]*\n.*?\n```", "", txt, 0, re.DOTALL)
    return txt


class BeaconSpeech:
    def __init__(self, name, location):
        self.name = name
        self.location = location
        self.speech_config = speechsdk.SpeechConfig(
            subscription=SPEECH_KEY, region=SPEECH_REGION
        )
        self.speech_config.speech_synthesis_voice_name = "vi-VN-HoaiMyNeural"
        auto_detect_source_language_config = (
            speechsdk.languageconfig.AutoDetectSourceLanguageConfig(
                languages=["vi-VN", "en-US"]
            )
        )
        self.speech_recognizer = speechsdk.SpeechRecognizer(
            speech_config=self.speech_config,
            auto_detect_source_language_config=auto_detect_source_language_config,
        )

        self.done = False
        self.history = []

    def recognize(self) -> str or None:
        try:
            result = self.speech_recognizer.recognize_once_async().get()

            if result.reason == speechsdk.ResultReason.RecognizedSpeech:
                print("Recognized: {}".format(result.text))
                return result.text
            elif result.reason == speechsdk.ResultReason.NoMatch:
                print(
                    "No speech could be recognized: {}".format(result.no_match_details)
                )
            elif result.reason == speechsdk.ResultReason.Canceled:
                cancellation_details = result.cancellation_details
                print(
                    "Speech Recognition canceled: {}".format(
                        cancellation_details.reason
                    )
                )
                if cancellation_details.reason == speechsdk.CancellationReason.Error:
                    print(
                        "Error details: {}".format(cancellation_details.error_details)
                    )
                    print("Did you set the speech resource key and region values?")
            return None

        except Exception as e:
            print(e)
            return None

    def recognize_from_microphone(self) -> str or None:
        return self.recognize()

    def speech_from_text(self, text: str):
        audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

        speech_synthesizer = speechsdk.SpeechSynthesizer(
            speech_config=self.speech_config, audio_config=audio_config
        )
        speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

        if (
            speech_synthesis_result.reason
            == speechsdk.ResultReason.SynthesizingAudioCompleted
        ):
            audio_stream = speech_synthesis_result.audio_data
            return audio_stream

        return None

    def wake_up(self):
        current_path = os.path.dirname(os.path.realpath(__file__))
        model = speechsdk.KeywordRecognitionModel(current_path + "/hey-beacon.table")

        keyword_recognizer = speechsdk.KeywordRecognizer()

        count = 0

        def recognized_cb(evt):
            # Only a keyword phrase is recognized. The result cannot be 'NoMatch'
            # and there is no timeout. The recognizer runs until a keyword phrase
            # is detected or recognition is canceled (by stop_recognition_async()
            # or due to the end of an input file or stream).
            result = evt.result
            if result.reason == speechsdk.ResultReason.RecognizedKeyword:
                print("RECOGNIZED KEYWORD: {}".format(result.text))
            nonlocal count
            count = 0
            self.done = True

        def canceled_cb(evt):
            result = evt.result
            if result.reason == speechsdk.ResultReason.Canceled:
                print("CANCELED: {}".format(result.cancellation_details.reason))
                print("CANCELED: {}".format(result.cancellation_details.error_details))
            self.done = True

        # Connect callbacks to the events fired by the keyword recognizer.
        keyword_recognizer.recognized.connect(recognized_cb)
        keyword_recognizer.canceled.connect(canceled_cb)

        result_future = keyword_recognizer.recognize_once_async(model)
        result_keyword_verify = result_future.get()

        if result_keyword_verify.reason == speechsdk.ResultReason.RecognizedKeyword:
            stop_future = keyword_recognizer.stop_recognition_async()
            print("Stopping...")
            stopped = stop_future.get()

            while self.done:
                self.speech_from_text(random.choice(talk.hello))
                user_input = self.recognize_from_microphone()
                if user_input is not None:
                    self.history.append({"role": "user", "content": user_input})
                    self.speech_from_text("Đang xử lý...")
                    print("Processing...")
                    response = generate_gpt_response(self.history)
                    self.history.append({"role": "assistant", "content": response})
                    self.speech_from_text(response)
                else:
                    self.speech_from_text(
                        "Xin lỗi, tôi không nghe rõ. Bạn có thể nói lại được không?"
                    )
                    count += 1
                    time.sleep(1)

                if count == 3:
                    self.speech_from_text(random.choice(talk.bye))
                    self.done = False
                    break


if __name__ == "__main__":
    beacon = BeaconSpeech("Beacon", "Việt Nam")

    beacon.speech_from_text(talk.wake_up)
    while True:
        try:
            beacon.wake_up()
        except EOFError:
            break
