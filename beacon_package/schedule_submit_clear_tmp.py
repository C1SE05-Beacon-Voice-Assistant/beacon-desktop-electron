
import requests
import json
import os

class Schedule:
    def read_tmp_log(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        log_file_path = os.path.join(current_dir, "log", "tmp.log")
        logs = []
        with open(log_file_path, 'r') as file:
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
            response = requests.post(
                'http://localhost:8000/api/data', data=json_payload, headers=headers)

            if response.status_code == 200:
                return response.json()
            else:
                print("Failed to send request.")
        except Exception as e:
            print(e)
    def clear_log(self):
      current_dir = os.path.dirname(os.path.abspath(__file__))
      log_file_path = os.path.join(current_dir, "log", "tmp.log")
      with open(log_file_path, "w") as file:
          file.truncate(0)


if __name__ == "__main__":
    conversion = Schedule()
    conversion.send_request()
    conversion.clear_log()
    # pass
