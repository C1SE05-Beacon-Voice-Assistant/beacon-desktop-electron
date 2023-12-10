import os
import azure.cognitiveservices.speech as speechsdk

def keyword_recognition():
    model = speechsdk.KeywordRecognitionModel(os.path.join(os.path.dirname(__file__), "final_highfa.table"))

    keyword_recognizer = speechsdk.KeywordRecognizer()

    def recognized_cb(evt):
        result = evt.result
        if result.reason == speechsdk.ResultReason.RecognizedKeyword:
            return result.text

    def canceled_cb(evt):
        result = evt.result
        if result.reason == speechsdk.ResultReason.Canceled:
            return result.text

    keyword_recognizer.recognized.connect(recognized_cb)
    keyword_recognizer.canceled.connect(canceled_cb)

    result_future = keyword_recognizer.recognize_once_async(model)
    result_keyword_verify = result_future.get()

    if result_keyword_verify.reason == speechsdk.ResultReason.RecognizedKeyword:
        stop_future = keyword_recognizer.stop_recognition_async()
        stopped = stop_future.get()

    return result_keyword_verify.text

if __name__ == "__main__":
    pass
    print(keyword_recognition())
