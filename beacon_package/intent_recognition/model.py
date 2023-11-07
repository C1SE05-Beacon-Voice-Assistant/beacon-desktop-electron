import torch
from keras.src.utils import pad_sequences
from torch import nn

from pre_train_phobert import pre_train

# # Khởi tạo tokenizer và mô hình PhoBERT
tokenizer, model = pre_train()
#
# # Định nghĩa số lớp của mô hình
# num_labels = 4
# model.config.num_labels = num_labels
#
model_path = 'E:/PROJECT/beacon-desktop-electron/beacon_package/intent_recognition/model/pytorch_model.bin'
# model.load_state_dict(torch.load(model_path))
#
# # Chuẩn bị câu đầu vào
sentence = "Tôi muốn đọc báo mới nhất hôm nay."
#
# # Tiền xử lý câu đầu vào
# inputs = tokenizer.encode_plus(
#     sentence,
#     add_special_tokens=True,
#     padding='max_length',
#     truncation=True,
#     max_length=128,
#     return_tensors='pt'
# )
#
# # Dự đoán ý định từ câu đầu vào
# with torch.no_grad():
#   outputs = model(**inputs)
#   predicted_labels = torch.argmax(outputs[0], dim=1).tolist()
#
# # In kết quả dự đoán
# label_mapping = {0: 'Listen to music', 1: 'GPT AI', 2: 'Read newspaper', 3: 'User manual'}
# # predicted_label = label_mapping[predicted_labels[0]]
# print(f"Kết quả dự đoán: {predicted_labels[0]}")


label = ['Listen to music',
 'GPT AI',
 'Read newspaper',
 'User manual',]

class CBmodel(nn.Module):
  def __init__(self, pre_train, n_dim, num_label):
    super().__init__()
    #implement pre-train model phoBERT
    self.BERT = pre_train
    #freeze BERT layer
    for child in self.BERT.children():
      for param in child.parameters():
          param.requires_grad = False
    #fully connected
    self.fc_ic = nn.Linear(n_dim, num_label)
    #softmax layer
    self.softmax = nn.Softmax(dim=1)
  def forward(self, x, tags=None, pad_id=1.0):
    #masking
    x_masks = self.make_bert_mask(x, pad_id)  # (B, L)
    features = self.BERT(x, attention_mask=x_masks) #(B, L, N_dim) , (B, N_dim)
    output_ic = self.fc_ic(features[1]) #(B, N_labels)
    output_ic = self.softmax(output_ic)
    return output_ic

  def make_bert_mask(self, x, pad_id):
    bert_masks = (x != pad_id).float()  # (B, L)
    return torch.Tensor(bert_masks)
def vectorlization(sent):
  seq = tokenizer.encode(sent)
  seq_pad = pad_sequences([seq], 50, padding='post', value=1.0)
  return torch.tensor(seq_pad)

def predict(sent, model):
  with torch.no_grad():
    input = vectorlization(sent)
    output = model(input)
  ids = torch.argmax(output[0])
  return ids


# model1 = CBmodel(model, 768, 4)
# # model1 = torch.load(model_path, map_location=torch.device('cpu'))
# model1.load_state_dict(torch.load(model_path))
# model1.eval()

# print(f"Kết quả dự đoán: {predict(sentence, model1)}")
