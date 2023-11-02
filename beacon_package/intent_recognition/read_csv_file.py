import pandas as pd

# Đọc dữ liệu từ file CSV
data = pd.read_csv("data.csv")

# Lấy các cột chứa văn bản và nhãn
def read_csv():
  texts = data["text_column"].tolist()
  labels = data["label_column"].tolist()
  return texts, labels
