from read_csv_file import read_csv
from pre_train_phobert import pre_train
import torch
from vncorenlp import VnCoreNLP

# Đọc file train.csv
sentences, labels = read_csv()

tokenizer, model = pre_train()

# def convert_list_to_int(input_list, mapping_dict):
#   converted_list = []
#   for item in input_list:
#     converted_item = mapping_dict.get(item, item)
#     converted_list.append(converted_item)
#   return converted_list
#
# mapping_dict = {'Listen to music': 0, 'GPT AI': 1, 'Read newspaper': 2, 'User manual': 3}
#
# labels = convert_list_to_int(labels, mapping_dict)

# Khởi tạo tokenizer và mã hóa dữ liệu
encoded_inputs = tokenizer(sentences, padding=True, truncation=True, max_length=128, return_tensors="pt")
labels = torch.tensor(labels)

# Khởi tạo mô hình và optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)

# Khởi tạo DataLoader cho huấn luyện
dataset = torch.utils.data.TensorDataset(encoded_inputs["input_ids"], encoded_inputs["attention_mask"], labels)
train_loader = torch.utils.data.DataLoader(dataset, batch_size=8, shuffle=True)

# Huấn luyện
epochs = 5
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.train()

for epoch in range(epochs):
    print('======== Epoch {:} / {:} ========'.format(epoch + 1, epochs))
    print('Training...')
    for batch in train_loader:
        input_ids, attention_mask, labels = batch
        input_ids = input_ids.to(device)
        attention_mask = attention_mask.to(device)
        labels = labels.to(device)
        optimizer.zero_grad()
        outputs = model(input_ids, attention_mask=attention_mask)[0]
        # loss = torch.nn.CrossEntropyLoss()(outputs, labels)
        # loss.backward()
        optimizer.step()


print('Train done!')
print('Khởi tạo VNCoreNLP!')
# Khởi tạo VnCoreNLP
vncorenlp_path = 'E:/PROJECT/beacon-desktop-electron/beacon_package/vncorenlp\VnCoreNLP-1.1.1.jar'
vncorenlp = VnCoreNLP(vncorenlp_path, annotators="wseg", max_heap_size='-Xmx500m')
print('Khởi tạo thành công!')

# Chuẩn bị câu cần detect
input_sentence = "Tôi muốn đọc tin tức mới nhất ngày mai"

print('Tiền xử lý câu với VnCoreNLP!')
# Tiền xử lý câu với VnCoreNLP
# tokenized_sentence = vncorenlp.tokenize(input_sentence)
# flattened_sentence = [word for sublist in tokenized_sentence for word in sublist]
# joined_sentence = " ".join(flattened_sentence)

print('Mã hoá câu!')
# Mã hóa câu
encoded_input = tokenizer([input_sentence], padding=True, truncation=True, max_length=128, return_tensors="pt")
input_ids = encoded_input["input_ids"].to(device)
attention_mask = encoded_input["attention_mask"].to(device)

print('Dự đoán!')
# Dự đoán
model.eval()
with torch.no_grad():
    outputs = model(input_ids)[0]
    predicted_label = torch.argmax(outputs).item()

print('Xác định label tương ứng!')
# Xác định label tương ứng
labels_mapping = {
    0: "read news",
    1: "listen to music",
    2: "gpt 4",
    3: "user manual"
}
# predicted_label = labels_mapping[predicted_label]

print("Input sentence:", input_sentence)
print("Predicted label:", predicted_label)
