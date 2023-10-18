from sys import argv
import azure.cognitiveservices.speech as speechsdk


def synthesize_speech(text, speech_key, speech_region):
    speech_config = speechsdk.SpeechConfig(
        subscription=speech_key, region=speech_region
    )
    speech_config.speech_synthesis_voice_name = "vi-VN-NamMinhNeural"

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if (
        speech_synthesis_result.reason
        == speechsdk.ResultReason.SynthesizingAudioCompleted
    ):
        audio_stream = speech_synthesis_result.audio_data
        return audio_stream

    return None


if __name__ == "__main__":
    speech_key = "cd1e1747056d4ccfadbbd424183e92bf"
    speech_region = "eastasia"

    text = "Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi Hôm nay đẹp quá ta ơi "  # Replace with the desired input text
    audio_stream = synthesize_speech(text, speech_key, speech_region)

    if audio_stream is not None:
        # Do something with the audio stream, such as saving it to a file
        with open("output.wav", "wb") as audio_file:
            audio_file.write(audio_stream)

        print("Tổng hợp giọng nói đã hoàn tất. Đã lưu âm thanh vào output.wav")
    else:
        print("Tổng hợp giọng nói thất bại.")

if __name__ == "__main__":
    speech_key = "cd1e1747056d4ccfadbbd4"