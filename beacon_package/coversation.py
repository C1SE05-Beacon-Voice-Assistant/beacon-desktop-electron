import logging
import requests
import json


class Conversion:
    def __init__(self,query,output , output_type, label,user):
        self.query = query
        self.label = label
        self.output = output
        self.output_type = output_type
        self.user = user
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

        # Config main log
        self.main_logger = logging.getLogger("MainLogger")
        main_handler = logging.FileHandler('log/main.log')
        main_handler.setLevel(logging.INFO)
        self.main_logger.addHandler(main_handler)

        # Config tmp log
        self.tmp_logger = logging.getLogger("TmpLogger")
        tmp_log_handler = logging.FileHandler('log/tmp.log')
        tmp_log_handler.setLevel(logging.INFO)
        self.tmp_logger.addHandler(tmp_log_handler)

    def save_main_log(self):
        payload = {
            "query": self.query,
            "output": self.output,
            "output_type": self.output_type,
            "user": self.user,
            "label": self.label
        }
        self.save_tmp_log()
        self.main_logger.info(json.dumps(payload))

    def save_tmp_log(self):
        payload = {
            "query": self.query,
            "output": self.output,
            "output_type": self.output_type,
            "user": self.user,
            "label": self.label
        }
        self.tmp_logger.info(json.dumps(payload))

    def read_tmp_log(self):
      logs = []
      with open('log/tmp.log', 'r') as file:
        for line in file:
          logs.append(json.loads(line.strip()))
      return logs

    def send_request(self):
      try:
          logs = self.read_tmp_log()
          json_payload = json.dumps(logs)
          headers = {
            'Content-Type': 'application/json',
          }
          response = requests.post('http://localhost:8000/api/data', data=json_payload, headers=headers)

          if response.status_code == 200:

            print(len(response.json()))
            return response.json()
          else:
            print("Failed to send request.")
      except Exception as e:
            print(e)


if __name__ == "__main__":
    conversion = Conversion("string","GPT_AI", "SEARCH_NEWS","correct", "6517a5b24f7c71a4fe132f92")

    conversion.save_main_log()
    conversion.send_request()
