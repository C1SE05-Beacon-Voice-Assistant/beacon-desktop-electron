from intent_recognition.intent_recognition import RunModel
import sys

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.flush()

    if len(sys.argv) > 1:
        query = sys.argv[1]
        run_model = RunModel()
        label, text = run_model.predict(query)
        print("{}:{}".format(label, text))