import requests
import json

class Conversion:
    def read_tmp_log(self):
      logs = []
      with open('log/tmp.log', 'r') as file:
        for line in file:
          logs.append(json.loads(line.strip()))
      return logs


if __name__ == "__main__":
    conversion = Conversion()
    print( conversion.read_tmp_log())
