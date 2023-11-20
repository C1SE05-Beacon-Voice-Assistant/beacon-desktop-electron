import csv
import os


def extract_sentences_and_labels(file_path):
  sentences = []
  labels = []

  with open(file_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    rows = list(reader)
    labels_row = rows[0]
    data_rows = rows[1:]

    for data_row in data_rows:
      if len(data_row) == len(labels_row):
        for i, value in enumerate(data_row):
          if(value != ""):
            sentences.append(value)
            labels.append(labels_row[i])

  return sentences, labels


# Đường dẫn đến tệp CSV của bạn
csv_file_path = os.path.join(os.path.dirname(__file__), 'model-training.csv')

# Gọi hàm để trích xuất câu và nhãn tương ứng
extracted_sentences, extracted_labels = extract_sentences_and_labels(csv_file_path)

# In ra các câu và nhãn tương ứng
for sentence, label in zip(extracted_sentences, extracted_labels):
  print(label, sentence)
