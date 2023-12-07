import time
import speech_recognition as sr

def detect_silence(duration):
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source, phrase_time_limit=duration)

    try:
        text = r.recognize_google(audio)
        print("Speech detected:", text)
    except sr.UnknownValueError:
        print("No speech detected.")
    except sr.RequestError as e:
        print("Error:", str(e))

detect_silence(10)  # Độ dài khoảng thời gian để phát hiện (ví dụ: 10 giây)
