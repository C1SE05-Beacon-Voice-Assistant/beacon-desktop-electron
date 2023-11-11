from read_csv_file import read_csv
from vncorenlp import VnCoreNLP
from keras.utils import pad_sequences
import random
from tqdm import tqdm
import pickle
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
import torch
import numpy as np
from sklearn.metrics import f1_score, accuracy_score
import os
from transformers import BertForSequenceClassification, AutoConfig, AdamW, AutoModel, AutoTokenizer
from datetime import datetime
import glob
from sklearn.model_selection import train_test_split

# PATH
base_dir = os.path.dirname(os.path.abspath(''))
vncorenlp_path = os.path.join(base_dir, 'vncorenlp', 'VnCoreNLP-1.1.1.jar')
config_path = os.path.join(base_dir, 'phobert-base', 'config.json')
model_path = os.path.join(base_dir, 'phobert-base', 'model.bin')


def make_mask(batch_ids):
    batch_mask = []
    for ids in batch_ids:
        mask = [int(token_id > 0) for token_id in ids]
        batch_mask.append(mask)
    return torch.tensor(batch_mask)


def dataloader_from_text(labels=None, texts=None, tokenizer=None, savetodisk=None, loadformdisk=None, segment=False,
                         max_len=256, batch_size=16, infer=False):
    if labels is None:
        labels = []
    if texts is None:
        texts = []
    ids_padded, masks = [], []
    if loadformdisk is None:
        # segementer
        if segment:
            rdrsegmenter = VnCoreNLP(vncorenlp_path, annotators="wseg", max_heap_size='-Xmx500m')
        print("LOADDING TEXT FILE")

        print("TEXT TO IDS")
        ids = []
        for text in tqdm(texts):
            encoded_sent = tokenizer.encode(text)
            ids.append(encoded_sent)

        del texts
        # print("PADDING IDS")
        ids_padded = pad_sequences(ids, maxlen=max_len, dtype="long", value=0, truncating="post", padding="post")
        del ids
        # print("CREATE MASK")
        # for sent in tqdm(ids_padded):
        #     masks.append(make_mask(sent))

        if savetodisk is not None and not infer:
            with open(savetodisk, 'wb') as f:
                pickle.dump(ids_padded, f)
                # pickle.dump(masks, f)
                pickle.dump(labels, f)
            print("SAVED IDS DATA TO DISK")
    else:
        print("LOAD FORM DISK")
        if loadformdisk is not None:
            try:
                with open(savetodisk, 'rb') as f:
                    ids_padded = pickle.load(ids_padded, f)
                    # masks = pickle.load(masks, f)
                    labels = pickle.load(labels, f)
                print("LOADED IDS DATA FORM DISK")
            except:
                print("LOAD DATA FORM DISK ERROR!")

    print("CONVERT TO TORCH TENSOR")
    ids_inputs = torch.tensor(ids_padded)
    del ids_padded
    # masks = torch.tensor(masks)
    if not infer:
        labels = torch.tensor(labels)

    print("CREATE DATALOADER")
    if infer:
        # input_data = TensorDataset(ids_inputs, masks)
        input_data = TensorDataset(ids_inputs)
    else:
        input_data = TensorDataset(ids_inputs, labels)
        # input_data = TensorDataset(ids_inputs, masks, labels)
    input_sampler = SequentialSampler(input_data)
    dataloader = DataLoader(input_data, sampler=input_sampler, batch_size=batch_size)

    print("len dataloader:", len(dataloader))
    print("LOAD DATA ALL DONE")
    return dataloader


class ROBERTAClassifier(torch.nn.Module):
    def __init__(self, num_labels, bert_model, dropout_rate=0.3):
        super(ROBERTAClassifier, self).__init__()
        if bert_model is not None:
            self.roberta = bert_model
        else:
            self.roberta = AutoModel.from_pretrained("vinai/phobert-base")
        self.d1 = torch.nn.Dropout(dropout_rate)
        self.l1 = torch.nn.Linear(768, 64)
        self.bn1 = torch.nn.LayerNorm(64)
        self.d2 = torch.nn.Dropout(dropout_rate)
        self.l2 = torch.nn.Linear(64, num_labels)

    def forward(self, input_ids, attention_mask):
        _, x = self.roberta(input_ids=input_ids, attention_mask=attention_mask)
        x = self.d1(x)
        x = self.l1(x)
        x = self.bn1(x)
        x = torch.nn.Tanh()(x)
        x = self.d2(x)
        x = self.l2(x)
        return x


class BERTClassifier(torch.nn.Module):
    def __init__(self, num_labels):
        super(BERTClassifier, self).__init__()
        bert_classifier_config = AutoConfig.from_pretrained(
            config_path,
            from_tf=False,
            num_labels=num_labels,
            output_hidden_states=False,
        )
        print("LOAD BERT PRETRAIN MODEL")
        self.bert_classifier = BertForSequenceClassification.from_pretrained(
            model_path,
            config=bert_classifier_config
        )

    def forward(self, input_ids, attention_mask, labels):
        output = self.bert_classifier(input_ids=input_ids,
                                      token_type_ids=None,
                                      attention_mask=attention_mask,
                                      labels=labels
                                      )
        return output


class ClassifierTrainner():
    def __init__(self, bert_model, train_dataloader, valid_dataloader, epochs=10, cuda_device="cpu", save_dir=None):

        # if cuda_device == "cpu":
        #     self.device == torch.device("cpu")
        # else:
        #     self.device == torch.device("cpu")
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        self.model = bert_model
        if save_dir is not None and os.path.exists(save_dir):
            print("Load weight from file:{}".format(save_dir))
            self.save_dir = save_dir
            echo_checkpoint_path = glob.glob("{}/model_epoch*".format(self.save_dir))
            if len(echo_checkpoint_path) == 0:
                print("No checkpoint found in: {}\nCheck save_dir...".format(self.save_dir))
            else:
                self.load_checkpoint(echo_checkpoint_path)
                print("Restore weight successful from: {}".format(echo_checkpoint_path))
        else:
            self.save_dir = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
            os.makedirs(self.save_dir)
            print("Training new model, save to: {}".format(self.save_dir))

        self.train_dataloader = train_dataloader
        self.valid_dataloader = valid_dataloader
        self.epochs = epochs
        # self.batch_size = batch_size

    def save_checkpoint(self, save_path):
        state_dict = {'model_state_dict': self.model.state_dict()}
        torch.save(state_dict, save_path)
        print(f'Model saved to ==> {save_path}')

    def load_checkpoint(self, load_path):
        state_dict = torch.load(load_path, map_location=self.device)
        print(f'Model restored from <== {load_path}')
        self.model.load_state_dict(state_dict['model_state_dict'])

    @staticmethod
    def flat_accuracy(preds, labels):
        pred_flat = np.argmax(preds, axis=1).flatten()
        labels_flat = labels.flatten()
        F1_score = f1_score(pred_flat, labels_flat, average='macro')
        return accuracy_score(pred_flat, labels_flat), F1_score

    def train_classifier(self):
        self.model.to(self.device)
        param_optimizer = list(self.model.named_parameters())
        no_decay = ['bias', 'LayerNorm.bias', 'LayerNorm.weight']
        optimizer_grouped_parameters = [
            {'params': [p for n, p in param_optimizer if not any(nd in n for nd in no_decay)], 'weight_decay': 0.01},
            {'params': [p for n, p in param_optimizer if any(nd in n for nd in no_decay)], 'weight_decay': 0.0}
        ]
        optimizer = AdamW(optimizer_grouped_parameters, lr=1e-5, correct_bias=False)

        for epoch_i in range(0, self.epochs):
            print('======== Epoch {:} / {:} ========'.format(epoch_i + 1, self.epochs))
            print('Training...')

            total_loss = 0
            self.model.train()
            train_accuracy = 0
            nb_train_steps = 0
            train_f1 = 0
            best_valid_loss = 999999
            best_eval_accuracy = 0
            for step, batch in enumerate(self.train_dataloader):
                b_input_ids = batch[0].to(self.device)
                b_input_mask = make_mask(batch[0]).to(self.device)
                b_labels = batch[1].to(self.device)

                self.model.zero_grad()
                outputs = self.model(b_input_ids,
                                     attention_mask=b_input_mask,
                                     labels=b_labels
                                     )
                loss = outputs[0]
                total_loss += loss.item()

                logits = outputs[1].detach().cpu().numpy()
                label_ids = b_labels.cpu().numpy()
                tmp_train_accuracy, tmp_train_f1 = self.flat_accuracy(logits, label_ids)
                train_accuracy += tmp_train_accuracy
                train_f1 += tmp_train_f1
                nb_train_steps += 1

                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), 1.0)
                optimizer.step()
                if step % 100 == 0:
                    print(
                        "[TRAIN] Epoch {}/{} | Batch {}/{} | Train Loss={} | Train Acc={}".format(epoch_i, self.epochs,
                                                                                                  step,
                                                                                                  len(self.train_dataloader),
                                                                                                  loss.item(),
                                                                                                  tmp_train_accuracy))

            avg_train_loss = total_loss / len(self.train_dataloader)
            print(" Train Accuracy: {0:.4f}".format(train_accuracy / nb_train_steps))
            print(" Train F1 score: {0:.4f}".format(train_f1 / nb_train_steps))
            print(" Train Loss: {0:.4f}".format(avg_train_loss))

            print("Running Validation...")
            self.model.eval()
            eval_loss, eval_accuracy = 0, 0
            nb_eval_steps, nb_eval_examples = 0, 0
            eval_f1 = 0

            for batch in self.valid_dataloader:
                b_input_mask = make_mask(batch[0]).to(self.device)
                batch = tuple(t.to(self.device) for t in batch)
                b_input_ids, b_labels = batch
                with torch.no_grad():
                    outputs = self.model(b_input_ids,
                                         attention_mask=b_input_mask,
                                         labels=b_labels
                                         )
                    tmp_eval_loss, logits = outputs[0], outputs[1]
                    logits = logits.detach().cpu().numpy()
                    label_ids = b_labels.cpu().numpy()
                    tmp_eval_accuracy, tmp_eval_f1 = self.flat_accuracy(logits, label_ids)
                    eval_accuracy += tmp_eval_accuracy
                    eval_loss += tmp_eval_loss
                    eval_f1 += tmp_eval_f1
                    nb_eval_steps += 1

            print(" Valid Loss: {0:.4f}".format(eval_loss / nb_eval_steps))
            print(" Valid Accuracy: {0:.4f}".format(eval_accuracy / nb_eval_steps))
            print(" Valid F1 score: {0:.4f}".format(eval_f1 / nb_eval_steps))

            if best_valid_loss > eval_loss:
                best_valid_loss = eval_loss
                best_valid_loss_path = "{}/model_best_valoss.pt".format(self.save_dir)
                self.save_checkpoint(best_valid_loss_path)
            if best_eval_accuracy > eval_accuracy:
                best_eval_accuracy = eval_accuracy
                best_eval_accuracy_path = "{}/model_best_valacc.pt".format(self.save_dir)
                self.save_checkpoint(best_eval_accuracy_path)

            epoch_i_path = "{}/model_epoch{}.pt".format(self.save_dir, epoch_i)
            self.save_checkpoint(epoch_i_path)
            if epoch_i > 0:
                os.remove("{}/model_epoch{}.pt".format(self.save_dir, epoch_i - 1))

        print("Training complete!")

        def predict_dataloader(self, dataloader, classes, tokenizer):
            for batch in dataloader:
                batch = tuple(t.to(self.device) for t in batch)
                b_input_ids, b_input_mask = batch
                with torch.no_grad():
                    outputs = self.model(b_input_ids,
                                         attention_mask=b_input_mask,
                                         labels=None
                                         )
                    logits = outputs
                    logits = logits.detach().cpu().numpy()
                    pred_flat = np.argmax(logits, axis=1).flatten()
                    print("[PREDICT] {}:{}".format(classes[int(pred_flat)], tokenizer.decode(b_input_ids)))

        def predict_text(self, text, classes, tokenizer, max_len=256):
            ids = tokenizer.encode(text)
            ids_padded = pad_sequences(ids, maxlen=max_len, dtype="long", value=0, truncating="post", padding="post")
            mask = [int(token_id > 0) for token_id in ids_padded]
            input_ids = torch.tensor(ids_padded)
            intput_mask = torch.tensor(mask)
            with torch.no_grad():
                logits = self.model(input_ids,
                                    attention_mask=intput_mask,
                                    labels=None
                                    )
                logits = logits.detach().cpu().numpy()
                pred_flat = np.argmax(logits, axis=1).flatten()
                print("[PREDICT] {}:{}".format(classes[int(pred_flat)], text))

    def predict_text(self, text, classes, tokenizer, max_len=256):
        ids = tokenizer.encode(text)
        ids_padded = pad_sequences([list(ids)], maxlen=max_len, dtype="long", value=0, truncating="post",
                                   padding="post")
        mask = [int(token_id > 0) for token_id in ids_padded[0]]
        input_ids = torch.tensor(ids_padded)
        input_mask = torch.tensor([mask])

        with torch.no_grad():
            logits = self.model(input_ids, attention_mask=input_mask, labels=None)
            logits = logits.logits.detach().cpu().numpy()
            pred_flat = np.argmax(logits, axis=1).flatten()
            print("[PREDICT] {}:{}".format(classes[int(pred_flat)], text))


def main():
    classes = {'listen_to_music': 0, 'gpt_ai': 1, 'read_news': 2, 'user_manual': 3}

    # Đọc file train.csv
    texts, train_labels = read_csv()

    labels = [classes[label] for label in train_labels]

    # Split train to train:valid = 90:10
    train_texts, val_texts, train_labels, val_labels = train_test_split(texts, labels, test_size=0.1)

    MAX_LEN = 256
    tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")

    train_dataloader = dataloader_from_text(train_labels, train_texts, tokenizer=tokenizer, savetodisk=None,
                                            max_len=MAX_LEN, batch_size=16)
    valid_dataloader = dataloader_from_text(val_labels, val_texts, tokenizer=tokenizer, savetodisk=None,
                                            max_len=MAX_LEN, batch_size=16)

    # bert model
    bert_classifier_model = BERTClassifier(len(classes))
    # train model
    bert_classifier_trainer = ClassifierTrainner(bert_model=bert_classifier_model, train_dataloader=train_dataloader,
                                                 valid_dataloader=valid_dataloader, epochs=10,
                                                 cuda_device="cpu")

    bert_classifier_trainer.predict_text("Tôi muốn nghe nhạc", classes, tokenizer)


def predict_text(text):
    classes = {'listen_to_music': 0, 'gpt_ai': 1, 'read_news': 2, 'user_manual': 3}
    model = BERTClassifier(len(classes))
    best_val_loss_model_path = os.path.join(base_dir, 'model', 'model_best_valoss.pt')
    best_val_loss_model_state_dict = torch.load(best_val_loss_model_path)
    best_val_loss_model = BERTClassifier(len(classes))
    best_val_loss_model.load_state_dict(best_val_loss_model_state_dict)
    best_val_loss_model.eval()

    epoch9_model_path = os.path.join(base_dir, 'model', 'model_epoch9.pt')
    epoch9_model_state_dict = torch.load(epoch9_model_path)
    epoch9_model = BERTClassifier(len(classes))
    epoch9_model.load_state_dict(epoch9_model_state_dict)
    epoch9_model.eval()


if __name__ == '__main__':
    print(predict_text("Tôi muốn nghe nhạc"))
