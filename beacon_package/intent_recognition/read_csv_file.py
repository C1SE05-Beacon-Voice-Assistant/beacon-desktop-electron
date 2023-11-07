import pandas as pd

# Đọc dữ liệu từ file CSV
data = pd.read_csv("train1.csv")

# Lấy các cột chứa văn bản và nhãn
def read_csv():
  texts = data["sentence"].tolist()
  labels = data["label"].tolist()
  return texts, labels
