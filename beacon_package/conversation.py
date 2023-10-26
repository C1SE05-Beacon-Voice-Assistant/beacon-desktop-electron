import logging
import requests
import json


class Conversion:
  def __init__(self, query, output,output_type, user):
    self.query = query
    self.output = output
    self.output_type = output_type
    self.user = user
    self.logger = logging.getLogger()
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

    # Config main log


    # Config tmp log


  def save_main_log(self):
    main_handler = logging.FileHandler('log/main.log')
    main_handler.setLevel(logging.INFO)
    self.logger.addHandler(main_handler)
    payload = {
      "query": self.query,
      "output": self.output,
      "output_type": self.output_type,
      "user": self.user
    }
    self.logger.info(json.dumps(payload))

  def save_tmp_log(self):
    tmp_log_handler = logging.FileHandler('log/tmp.log')
    tmp_log_handler.setLevel(logging.INFO)
    self.logger.addHandler(tmp_log_handler)
    payload = {
      "query": self.query,
      "output": self.output,
      "output_type": self.output_type,
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
      return response.json()
    else:
      print("Failed to send request.")


if __name__ == "__main__":
  conversion = Conversion("Nguyen Trieu Tien", "This is response","CONVERSATION", "65240e20f0a91236b71665f9")

  conversion.save_main_log()

  conversion.save_tmp_log()

  conversion.send_request()
