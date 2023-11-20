import glob
import os
import pickle
from datetime import datetime

import numpy as np
import torch
from keras.utils import pad_sequences
from sklearn.metrics import f1_score, accuracy_score
from sklearn.model_selection import train_test_split
from torch.utils.data import TensorDataset, DataLoader, SequentialSampler
from tqdm import tqdm
from transformers import BertForSequenceClassification, AutoConfig, AdamW, AutoTokenizer
from vncorenlp import VnCoreNLP

from read_csv_file import read_csv
import csv

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
    if texts is None:
        texts = []
    if labels is None:
        labels = []
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
                    labels = pickle.load(labels, f)
                print("LOADED IDS DATA FORM DISK")
            except:
                print("LOAD DATA FORM DISK ERROR!")

    print("CONVERT TO TORCH TENSOR")
    ids_inputs = torch.tensor(ids_padded)
    del ids_padded
    if not infer:
        labels = torch.tensor(labels)

    print("CREATE DATALOADER")
    if infer:
        input_data = TensorDataset(ids_inputs)
    else:
        input_data = TensorDataset(ids_inputs, labels)
    input_sampler = SequentialSampler(input_data)
    dataloader = DataLoader(input_data, sampler=input_sampler, batch_size=batch_size)

    print("len dataloader:", len(dataloader))
    print("LOAD DATA ALL DONE")
    return dataloader


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


class ClassifierTrainner:
    def __init__(self, bert_model, train_dataloader=None, valid_dataloader=None, epochs=1,
                 save_dir=None, is_run=False):

        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        self.model = bert_model
        if save_dir is not None and os.path.exists(save_dir):
            print("Load weight from file:{}".format(save_dir))
            self.save_dir = save_dir
            epcho_checkpoint_path = glob.glob("{}/model_epoch*".format(self.save_dir))
            if len(epcho_checkpoint_path) == 0:
                print("No checkpoint found in: {}\nCheck save_dir...".format(self.save_dir))
            else:
                self.load_checkpoint(epcho_checkpoint_path)
                print("Restore weight successful from: {}".format(epcho_checkpoint_path))
        elif is_run:
            print("Run model!")
        else:
            self.save_dir = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
            os.makedirs(self.save_dir)
            print("Training new model, save to: {}".format(self.save_dir))

        self.train_dataloader = train_dataloader
        self.valid_dataloader = valid_dataloader
        self.epochs = epochs

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
                    print("[TRAIN] Epoch {}/{} | Batch {}/{} | Train Loss={} | Train Acc={}".format(epoch_i,
                                                                                                    self.epochs,
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
        ids = [tokenizer.encode(text)]
        ids_padded = pad_sequences(ids, maxlen=max_len, dtype="long", value=0, truncating="post", padding="post")
        mask = [int(token_id > 0) for sequence in ids_padded for token_id in sequence]
        input_ids = torch.tensor(ids_padded)
        intput_mask = torch.tensor(mask).unsqueeze(0)
        with torch.no_grad():
            logits = self.model(input_ids,
                                attention_mask=intput_mask,
                                labels=None
                                )
            logits = logits.logits.cpu().numpy()
            pred_flat = np.argmax(logits, axis=1).flatten()
        return classes[int(pred_flat[0])]


def main():
    classes_map = {'play_music': 0, 'user_manual': 1, 'next_content': 2, 'pre_content': 3, 'end_of_content': 4,
               'middle_of_content': 5, 'start_content': 6, 'stop_content': 7, 'restart_content': 8, 'pause_content': 9,
               'resume_content': 10, 'increase_volume': 11, 'decrease_volume': 12, 'default_volume': 13,
               'min_volume': 14, 'max_volume': 15, 'mute': 16, 'un_mute': 17, 'lastest_news': 18, 'hottest_news': 19,
               'most_read_news': 20, 'read_news': 21}

    # Đọc file train.csv
    texts, train_labels = read_csv()

    labels = [classes_map[label] for label in train_labels]

    # Split train to train:valid = 90:10
    train_texts, val_texts, train_labels, val_labels = train_test_split(texts, labels, test_size=0.1)

    MAX_LEN = 256
    tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")

    train_dataloader = dataloader_from_text(train_labels, train_texts, tokenizer=tokenizer, savetodisk=None,
                                            max_len=MAX_LEN, batch_size=16)
    valid_dataloader = dataloader_from_text(val_labels, val_texts, tokenizer=tokenizer, savetodisk=None,
                                            max_len=MAX_LEN, batch_size=16)

    # bert model
    bert_classifier_model = BERTClassifier(len(classes_map))
    # train model
    bert_classifier_trainer = ClassifierTrainner(bert_model=bert_classifier_model, train_dataloader=train_dataloader,
                                                 valid_dataloader=valid_dataloader, epochs=2)
    bert_classifier_trainer.train_classifier()


class RunModel:
    def __init__(self):
        self.classes = ['play_music', 'user_manual', 'next_content', 'pre_content', 'end_of_content',
               'middle_of_content', 'start_content', 'stop_content', 'restart_content', 'pause_content',
               'resume_content', 'increase_volume', 'decrease_volume', 'default_volume',
               'min_volume', 'max_volume', 'mute', 'un_mute', 'lastest_news', 'hottest_news',
               'most_read_news', 'read_news']
        self.tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")
        model_path1 = os.path.join(base_dir, 'intent_recognition', 'model_epoch9.pt')
        # bert model
        self.bert_classifier_model = BERTClassifier(len(self.classes))
        # train model
        self.bert_classifier_trainer = ClassifierTrainner(bert_model=self.bert_classifier_model, is_run=True)
        self.bert_classifier_trainer.load_checkpoint(model_path1)

    def predict(self, text_input):
        return self.bert_classifier_trainer.predict_text(text_input, self.classes, self.tokenizer)


class RunModelTest:
    def __init__(self):
        self.classes = ['play_music', 'user_manual', 'next_content', 'pre_content', 'end_of_content',
                        'middle_of_content', 'start_content', 'stop_content', 'restart_content', 'pause_content',
                        'resume_content', 'increase_volume', 'decrease_volume', 'default_volume',
                        'min_volume', 'max_volume', 'mute', 'un_mute', 'lastest_news', 'hottest_news',
                        'most_read_news', 'read_news']
        self.tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")
        model_path1 = os.path.join(base_dir, 'intent_recognition', 'model_epoch9.pt')
        # bert model
        self.bert_classifier_model = BERTClassifier(len(self.classes))
        # train model
        self.bert_classifier_trainer = ClassifierTrainner(bert_model=self.bert_classifier_model, is_run=True)
        self.bert_classifier_trainer.load_checkpoint(model_path1)

    def test(self):
        texts, labels = read_csv()
        isFalse = 0
        total = 0
        label_predict_full  = []
        print("text: label - predict")
        for i in range(len(texts)):
            predict_test = self.bert_classifier_trainer.predict_text(texts[i], self.classes, self.tokenizer)
            total += 1
            label_predict_full.append(predict_test)
            if predict_test != labels[i]:
                isFalse += 1
                print(texts[i] + ": " + labels[i] + " - "+str(predict_test))
        print("Score: " + str(((total-isFalse)/total)*100) + "%")
        print("True: " + str((total-isFalse)) +", False: " + str(isFalse)+", Total: "+str(total))
        fieldnames = ['Text', 'Label', 'Predict']
        csv_file = os.path.join(os.path.dirname(__file__), 'finish_test.csv')
        with open(csv_file, mode='w',newline='', encoding='utf-8-sig') as file:
          writer = csv.DictWriter(file, fieldnames=fieldnames)

          # Ghi tên các cột vào file CSV
          writer.writeheader()

          # Ghi từng hàng dữ liệu vào file CSV
          for i in range(len(texts)):
            writer.writerow({'Text': texts[i], 'Label': labels[i], 'Predict': label_predict_full[i]})

        print("Dữ liệu đã được ghi vào file CSV.")




if __name__ == '__main__':
    run_model_test = RunModelTest()
    run_model_test.test()


