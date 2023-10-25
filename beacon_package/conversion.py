import logging
import requests
import json


class Conversion:
    def __init__(self, query, outputType, user):
        self.query = query
        self.output = query
        self.outputType = outputType
        self.user = user
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
        self.logger = logging.getLogger()

        # Config main log
        self.main_handler = logging.FileHandler('main.log')
        self.main_handler.setLevel(logging.INFO)
        self.logger.addHandler(self.main_handler)

        # Config tmp log
        self.tmp_log_handler = logging.FileHandler('tmp.log')
        self.tmp_log_handler.setLevel(logging.INFO)
        self.logger.addHandler(self.tmp_log_handler)

    def save_main_log(self):
        payload = {
          "query": self.query,
            "output": self.output,
            "outputType": self.outputType,
            "user": self.user
        }
        self.logger.info(json.dumps(payload))

    def save_tmp_log(self):
        payload = {
            "query": self.query,
            "output": self.output,
            "outputType": self.outputType,
            "user": self.user
        }
        self.logger.info(json.dumps(payload))

    def read_tmp_log(self):
        logs = []
        with open('tmp.log', 'r') as file:
            for line in file:
                logs.append(json.loads(line.strip()))
        return logs

    def send_request(self):
        logs = self.read_tmp_log()
        json_payload = json.dumps(logs)
        headers = {
            'Content-Type': 'application/json',
        }

        response = requests.post('http://localhost:8000/api/data', data=json_payload, headers=headers)

        if response.status_code == 200:
            print("Request sent successfully!")
        else:
            print("Failed to send request.")


if __name__ == "__main__":
    conversion = Conversion("Nguyen Trieu Tien", "CONVERSATION", "65240e20f0a91236b71665f9")

    conversion.save_main_log()

    conversion.save_tmp_log()

    conversion.send_request()
