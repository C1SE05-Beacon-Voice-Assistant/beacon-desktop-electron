import torch
from vncorenlp import VnCoreNLP
from pre_train_phobert import pre_train
from read_csv_file import read_csv
import numpy as np


# Khởi tạo tokenizer và mô hình PhoBERT
tokenizer, model = pre_train()

# Đọc file train.csv
texts, train_labels = read_csv()


# Khởi tạo VnCoreNLP
vncorenlp_dir = 'E:/PROJECT/beacon-desktop-electron/beacon_package/vncorenlp\VnCoreNLP-1.1.1.jar'
vncorenlp = VnCoreNLP(vncorenlp_dir, annotators="wseg", max_heap_size='-Xmx500m')

# Tiền xử lý dữ liệu bằng VnCoreNLP
def preprocess_text(text):
    sentences = vncorenlp.tokenize(text)
    return ' '.join([' '.join(sentence) for sentence in sentences])

# Tiền xử lý dữ liệu huấn luyện
train_texts_preprocessed = [preprocess_text(text) for text in texts]


def convert_list_to_int(input_list, mapping_dict):
  converted_list = []
  for item in input_list:
    converted_item = mapping_dict.get(item, item)
    converted_list.append(converted_item)
  return converted_list

mapping_dict = {'Listen to music': 0, 'GPT AI': 1, 'Read newspaper': 2, 'User manual': 3}

train_labels_preprocessed = convert_list_to_int(train_labels, mapping_dict)

# Mã hóa dữ liệu huấn luyện
train_encodings = tokenizer(train_texts_preprocessed, truncation=True, padding=True)

# Chuyển đổi dữ liệu sang định dạng tensors
train_dataset = torch.utils.data.TensorDataset(
    torch.tensor(train_encodings['input_ids']),
    torch.tensor(train_encodings['attention_mask']),
    torch.tensor(train_labels_preprocessed)
)

# Tạo DataLoader cho dữ liệu huấn luyện
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=2, shuffle=True)

# Huấn luyện mô hình
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)


def flat_accuracy(preds, labels):
  pred_flat = np.argmax(preds, axis=1).flatten()
  labels_flat = labels.flatten()
  return np.sum(pred_flat == labels_flat) / len(labels_flat)

epochs = 10
for epoch in range(0, epochs):
    print('======== Epoch {:} / {:} ========'.format(epoch + 1, epochs))
    print('Training...')
    model.train()
    total_loss = 0
    train_accuracy = 0
    nb_train_steps = 0
    train_f1 = 0

    for batch in train_loader:
        input_ids, attention_mask, labels = batch
        input_ids = input_ids.to(device)
        attention_mask = attention_mask.to(device)
        labels = labels.to(device)

        # batch = tuple(t.to(device) for t in batch)
        b_input_ids = batch[0].to(device)
        b_input_mask = batch[1].to(device)
        b_labels = batch[2].to(device)

        optimizer.zero_grad()
        outputs = model.forward(input_ids, attention_mask=attention_mask)
        loss = outputs[0]
        logits = loss.detach().cpu().numpy()
        label_ids = b_labels.to('cpu').numpy()
        total_loss += loss
        # loss.backward()
        # tmp_train_accuracy, tmp_train_f1 = flat_accuracy(logits, label_ids)
        # train_accuracy += tmp_train_accuracy
        # train_f1 += tmp_train_f1
        optimizer.step()
        nb_train_steps += 1

    average_loss = total_loss / nb_train_steps
    print(" Accuracy: {0:.4f}".format(train_accuracy / nb_train_steps))
    print(" F1 score: {0:.4f}".format(train_f1 / nb_train_steps))
    print(" Average training loss: {}", average_loss)

# Lưu mô hình đã huấn luyện
model.save_pretrained('E:/PROJECT/beacon-desktop-electron/beacon_package/intent_recognition/model')
tokenizer.save_pretrained('E:/PROJECT/beacon-desktop-electron/beacon_package/intent_recognition/tokenizer')

# Đóng VnCoreNLP
vncorenlp.close()

