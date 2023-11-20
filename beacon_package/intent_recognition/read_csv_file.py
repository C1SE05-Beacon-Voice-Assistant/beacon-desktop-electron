import pandas as pd
import os

# Đọc dữ liệu từ file CSV
data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'test.csv'))


# Lấy các cột chứa văn bản và nhãn
def read_csv():
    texts = data["sentence"].tolist()
    labels = data["label"].tolist()
    return texts, labels
