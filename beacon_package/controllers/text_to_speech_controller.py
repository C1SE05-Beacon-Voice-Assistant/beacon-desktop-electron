import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
import os

load_dotenv(".env")

SPEECH_KEY, SPEECH_REGION = os.getenv("SPEECH_KEY"), os.getenv("SPEECH_REGION")
SPEECH_VOICE = os.getenv("SPEECH_VOICE")


class TextToSpeechController:
    """
    A class that provides functionality to synthesize speech from text using Azure Cognitive Services.
    """

    def __init__(self):
        """
        Initializes a new instance of the TextToSpeechController class.
        """
        self.speech_config = speechsdk.SpeechConfig(
            subscription=SPEECH_KEY, region=SPEECH_REGION
        )
        self.speech_config.speech_synthesis_voice_name = SPEECH_VOICE

    def synthesize_speech(self, text):
        """
        Synthesizes speech from the given text.

        Args:
            text (str): The text to synthesize speech from.

        Returns:
            bytes: The audio stream of the synthesized speech.
        """
        speech_synthesizer = speechsdk.SpeechSynthesizer(
            speech_config=self.speech_config
        )
        speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

        if (
            speech_synthesis_result.reason
            == speechsdk.ResultReason.SynthesizingAudioCompleted
        ):
            audio_stream = speech_synthesis_result.audio_data
            return audio_stream

        return None

    def synthesize_speech_to_file(self, text, file_name):
        """
        Synthesizes speech from the given text and saves it to a file.

        Args:
            text (str): The text to synthesize speech from.
            file_name (str): The name of the file to save the synthesized speech to.
        """
        audio_stream = self.synthesize_speech(text)

        if audio_stream is not None:
            # Do something with the audio stream, such as saving it to a file
            with open(file_name, "wb") as audio_file:
                audio_file.write(audio_stream)

            print("Tổng hợp giọng nói đã hoàn tất. Đã lưu âm thanh vào " + file_name)
        else:
            print("Tổng hợp giọng nói thất bại.")


if __name__ == "__main__":
    text_to_speech = TextToSpeechController()
    text_to_speech.synthesize_speech_to_file("Không tìm thấy bài hát trên youtobe", "output.wav")
