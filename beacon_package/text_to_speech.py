import azure.cognitiveservices.speech as speechsdk
import os
import re
import sys

SPEECH_KEY, SPEECH_REGION = os.getenv("SPEECH_KEY"), os.getenv("SPEECH_REGION")

speech_config = speechsdk.SpeechConfig(subscription="4d74b26c859a4d338226896369488f55", region="southeastasia")
speech_config.speech_synthesis_voice_name = "vi-VN-HoaiMyNeural"

def speech_from_text(text: str):
    audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        audio_stream = speech_synthesis_result.audio_data
        return audio_stream

    return None

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.flush()

    if len(sys.argv) > 1:
        query = sys.argv[1]
        speech_from_text(query)
