import logging
import requests
import json
from datetime import datetime


class Conversion:
    def __init__(self, query, output, output_type, user):
        self.query = query
        self.output = output
        self.output_type = output_type
        self.user = user
        logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

        # Config main log
        self.logger = logging.getLogger("main_logger")
        # Config tmp log
        self.tmp_logger = logging.getLogger("tmp_logger")

    def file_handler(self, log_file):
        open(log_file, "a").close()
        handler = logging.FileHandler(log_file)
        handler.setLevel(logging.INFO)
        return handler

    def generate_payload(self):
        payload = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "query": self.query,
            "output": self.output,
            "output_type": self.output_type,
            "user": self.user,
        }
        return payload

    def save_main_log(self):
        # if not exist main.log file create main.log file
        # open("log/main.log", "a").close()
        main_handler = self.file_handler("log/main.log")
        self.logger.addHandler(main_handler)
        payload = self.generate_payload()
        self.logger.info(json.dumps(payload))

    def save_tmp_log(self):
        # if not exist tmp.log
        open("log/tmp.log", "a").close()
        tmp_log_handler = self.file_handler("log/tmp.log")
        self.tmp_logger.addHandler(tmp_log_handler)
        payload = self.generate_payload()
        self.tmp_logger.info(json.dumps(payload))

    def send_request(self):
        logs = read_log('log/tmp.log')
        json_payload = json.dumps(logs)
        headers = {
            "Content-Type": "application/json",
        }

        response = requests.post(
            "http://localhost:8000/api/data", data=json_payload, headers=headers
        )

        if response.status_code == 200:
            return response.json()
        else:
            print("Failed to send request.")

    def read_log(self, log_file):
        logs = []
        with open(log_file, "r") as f:
            for line in f.readlines():
                logs.append(json.loads(line.strip()))
        return logs


if __name__ == "__main__":
    conversion = Conversion(
        "Nguyen Trieu Tien",
        "This is response",
        "CONVERSATION",
        "65240e20f0a91236b71665f9",
    )

    conversion.save_main_log()

    conversion.save_tmp_log()

    print(conversion.read_log('log/tmp.log'))

    # conversion.send_request()
