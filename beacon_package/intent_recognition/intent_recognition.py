# from transformers import AutoModel, AutoTokenizer
# from transformers import PhobertTokenizer, PhobertForSequenceClassification, TrainingArguments, Trainer
# import torch
# import sys
# import codecs

# phobert = AutoModel.from_pretrained("vinai/phobert-base-v2")
# tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")
# model = PhobertForSequenceClassification.from_pretrained("vinai/phobert-base-v2")


# Tạo input
# text = "Cho tôi xem bài báo ngày mai."

# input_ids = torch.tensor([tokenizer.encode(sentence)])

# with torch.no_grad():
#     features = phobert(input_ids)  # Models outputs are now tuples
# text = codecs.decode(sys.argv[1], 'utf-8')

# # Gửi kết quả về cho JavaScript (sẽ được nhận trong đoạn mã JavaScript)
# print(f'Result from Python: {sys.argv[1]}')


# import sys
# print('Hello from Python!')
# sys.stdout.flush()


# import os
# import pandas as pd
# import re
# import tensorflow as tf


# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder
# from tensorflow import keras
# from bert import modeling
# from bert import optimization
# from bert import run_classifier
# from bert import tokenization


# def transform_labels(df, le=None):
#     if not le:
#         le = LabelEncoder()
#         df['label'] = le.fit_transform(df['label'])
#     else:
#         df['label'] = le.transform(df['label'])
#     return df.reset_index(drop=True), le


# def load_dataset(csv_file, le=None):
#     df = pd.read_csv(csv_file)
#     return transform_labels(df, le)


# def split_into_train_test(csv_file, stratify=True, **kwargs):
#     dirname = os.path.dirname(os.path.abspath(csv_file))
#     df = pd.read_csv(csv_file)
#     X = df['sentence']
#     y = df['label']
#     stratify_col = None
#     if stratify:
#         stratify_col = y
#     train_X, test_X, train_y, test_y = \
#         train_test_split(X, y, stratify=stratify_col, **kwargs)
#     train = pd.concat([train_X, train_y], axis=1).reset_index(drop=True)
#     test = pd.concat([test_X, test_y], axis=1).reset_index(drop=True)
#     train.to_csv(os.path.join(dirname, 'train.csv'), index=False)
#     test.to_csv(os.path.join(dirname, 'test.csv'), index=False)
#     return train, test


# def load_from_folder(path, le=None):
#     data = {'sentence': [], 'label': []}
#     for folder in os.path.listdir(path):
#         folder_path = os.path.join(path, folder)
#         for file in os.listdir(folder_path):
#             file_path = os.path.join(folder_path, file)
#             with tf.gfile.GFile(file_path, "r") as f:
#                 data['sentence'].append(f.read())
#                 data['label'].append(folder)
#     df = pd.DataFrame.from_dict(data)
#     return transform_labels(df, le)


# def create_tokenizer(vocab_file, do_lower_case=True):
#     return tokenization.FullTokenizer(
#         vocab_file=vocab_file, do_lower_case=do_lower_case)


# def create_model(bert_config, is_training, input_ids, input_mask, segment_ids,
#                  labels, num_labels):
#     """Creates a classification model."""
#     model = modeling.BertModel(
#         config=bert_config,
#         is_training=is_training,
#         input_ids=input_ids,
#         input_mask=input_mask,
#         token_type_ids=segment_ids,
#         use_one_hot_embeddings=False)

#     # If you want to use the token-level output, use model.get_sequence_output()
#     # instead.
#     output_layer = model.get_pooled_output()

#     hidden_size = output_layer.shape[-1].value

#     output_weights = tf.get_variable(
#         "output_weights", [num_labels, hidden_size],
#         initializer=tf.truncated_normal_initializer(stddev=0.02))

#     output_bias = tf.get_variable(
#         "output_bias", [num_labels], initializer=tf.zeros_initializer())

#     with tf.variable_scope("loss"):
#         if is_training:
#             # I.e., 0.1 dropout
#             output_layer = tf.nn.dropout(output_layer, keep_prob=0.9)

#         logits = tf.matmul(output_layer, output_weights, transpose_b=True)
#         logits = tf.nn.bias_add(logits, output_bias)
#         probabilities = tf.nn.softmax(logits, axis=-1)
#         predictions = tf.argmax(logits, axis=-1)
#         log_probs = tf.nn.log_softmax(logits, axis=-1)

#         # Convert labels into one-hot encoding
#         one_hot_labels = tf.one_hot(labels, depth=num_labels, dtype=tf.float32)

#         predicted_labels = tf.squeeze(
#             tf.argmax(log_probs, axis=-1, output_type=tf.int32))

#         per_example_loss = -tf.reduce_sum(one_hot_labels * log_probs, axis=-1)
#         loss = tf.reduce_mean(per_example_loss)
#         return (per_example_loss, loss, predicted_labels, log_probs)


# def model_fn_builder(bert_config_file, init_checkpoint, num_labels,
#                      learning_rate, num_train_steps, num_warmup_steps):
#     bert_config=modeling.BertConfig.from_json_file(bert_config_file)
#     def model_fn(features, labels, mode, params):

#         input_ids = features["input_ids"]
#         input_mask = features["input_mask"]
#         segment_ids = features["segment_ids"]
#         label_ids = features["label_ids"]

#         is_training = (mode == tf.estimator.ModeKeys.TRAIN)

#         (per_example_loss, loss, predicted_labels, log_probs) = \
#             create_model(bert_config,
#                 is_training, input_ids, input_mask, segment_ids,
#                 label_ids, num_labels)

#         (assignment_map, _) = \
#             modeling.get_assignment_map_from_checkpoint(
#                 tf.trainable_variables(), init_checkpoint)
#         tf.train.init_from_checkpoint(init_checkpoint, assignment_map)

#         if mode == tf.estimator.ModeKeys.TRAIN:
#             train_op = optimization.create_optimizer(
#                 loss, learning_rate, num_train_steps, num_warmup_steps,
#                 use_tpu=False)
#             return tf.estimator.EstimatorSpec(
#                 mode=mode, loss=loss, train_op=train_op)

#         elif mode == tf.estimator.ModeKeys.EVAL:
#             # Calculate evaluation metrics. 

#             def metric_fn(per_example_loss, label_ids, predicted_labels):
#                 accuracy = tf.metrics.accuracy(label_ids, predicted_labels)
#                 loss = tf.metrics.mean(values=per_example_loss)
#                 return {
#                     "eval_accuracy": accuracy,
#                     "eval_loss": loss,
#                 }
#             eval_metrics = \
#                 metric_fn(per_example_loss, label_ids, predicted_labels)
#             return tf.estimator.EstimatorSpec(
#                 mode=mode, loss=loss, eval_metric_ops=eval_metrics)
#         else:
#             predictions = {
#                 'probabilities': log_probs,
#                 'labels': predicted_labels
#             }
#             return tf.estimator.EstimatorSpec(mode, predictions=predictions)
#     return model_fn


# def get_estimator(checkpoint, bert_config_file, labels, batch_size, output_dir=None,
#                   save_summary_steps=None, save_checkpoints_steps=None,
#                   learning_rate=None, num_train_steps=None, num_warmup_steps=None):
#     run_config = tf.estimator.RunConfig(
#         model_dir=output_dir,
#         save_summary_steps=save_summary_steps,
#         save_checkpoints_steps=save_checkpoints_steps)

#     model_fn = model_fn_builder(
#         bert_config_file=bert_config_file,
#         init_checkpoint=checkpoint,
#         num_labels=len(labels),
#         learning_rate=learning_rate,
#         num_train_steps=num_train_steps,
#         num_warmup_steps=num_warmup_steps)

#     return tf.estimator.Estimator(
#         model_fn=model_fn,
#         config=run_config,
#         params={"batch_size": batch_size})


# def getPrediction(estimator, in_sentences, labels, label_list, max_seq_len,
#                   tokenizer):
#     input_examples = [run_classifier.InputExample(
#         guid="", text_a = x, text_b = None, label = 0) for x in in_sentences]
#     input_features = run_classifier.convert_examples_to_features(
#         input_examples, label_list, max_seq_len, tokenizer)
#     predict_input_fn = run_classifier.input_fn_builder(
#         features=input_features, seq_length=max_seq_len, is_training=False,
#         drop_remainder=False)
#     predictions = estimator.predict(predict_input_fn)
#     return [(sentence, pred['probabilities'], labels[pred['labels']])
#             for sentence, pred in zip(in_sentences, predictions)]


import numpy as np
import tensorflow as tf
import pickle


from argparse import ArgumentParser
from datetime import datetime
from time import time

from bert import run_classifier

from bert_classify_utils import load_dataset, load_from_folder, \
    create_tokenizer, model_fn_builder, get_estimator, getPrediction

from config import PARAMS


class BERTClassifier(object):

    def __init__(self, project, mode, skip_eval=False):
        try:
            params = PARAMS[project]
            self.vocab_file = params['vocab_file']
            self.bert_config_file = params['bert_config_file']
            self.max_seq_length = params['max_seq_length']
            self.label_encoder_pkl = params['label_encoder']
            self.estimator = None
        except:
            raise

        print("[INFO] Preparing Tokenizer...")
        self.tokenizer = create_tokenizer(vocab_file=self.vocab_file)
        print("[INFO] Done preparing tokenizer...\n")

        if mode == 'train':
            self.set_train_test_params(params)
            self.do_train()
            if not skip_eval and not self.test.empty:
                self.do_eval()
        else:
            try:
                predict_params = params['predict_params']
                self.model_checkpoint = predict_params['model_checkpoint']
                self.predict_batch_size = predict_params['predict_batch_size']
            except:
                raise
            with open(self.label_encoder_pkl, 'rb') as f:
                self.le = pickle.load(f)
            self.labels = self.le.classes_
            self.estimator = get_estimator(
                self.model_checkpoint, self.bert_config_file, self.labels,
                self.predict_batch_size)

    def set_train_test_params(self, params):
        self.test = None
        train_params = params['train_params']
        self.init_checkpoint = train_params['init_checkpoint']
        self.model_dir = train_params['model_dir']
        self.train_batch_size = train_params['train_batch_size']
        self.learning_rate = train_params['learning_rate']
        self.num_train_epochs = train_params['num_train_epochs']
        self.warmup_proportion = train_params.get('warmup_proportion')
        self.save_checkpoints_steps = train_params.get('save_checkpoints_steps')
        self.save_summary_steps = train_params.get('save_summary_steps')
        train_params_data = train_params['data']
        try:
            train_folder = train_params_data['train_folder']
            print(f"Train folder: {train_folder}")
            test_folder = train_params_data.get('test_folder')
            print("[INFO] Loading train data from folder...")
            self.train, self.le = load_from_folder(train_folder)
            if test_folder:
                print("[INFO] Loading test data from folder...")
                self.test, _ = load_from_folder(test_folder, self.le)
        except:
            try:
                print("[INFO] Loading train data from csv...")
                train_csv = train_params_data['beacon_package/intent_recognition/train.csv']
                test_csv = train_params_data.get('beacon_package/intent_recognition/test.csv')
                self.train, self.le = load_dataset(train_csv)
                if test_csv:
                    print("[INFO] Loading test data from csv...")
                    self.test, _ = load_dataset(test_csv, self.le)
            except:
                raise Exception("None of the `train_folder` or `train_csv` is "
                                "mentioned in configuration")
        self.labels = self.le.classes_
        with open(self.label_encoder_pkl, 'wb') as f:
            pickle.dump(self.le, f)

    def do_train(self):
        print("[INFO] Preparing train InputExample...")
        train_inputExamples = self.train.apply(
            lambda x: run_classifier.InputExample(
                guid=None,
                text_a=x['sentence'],
                text_b=None,
                label=x['label']), axis=1)
        print("[INFO] Done preparing train InputExample...\n")

        label_list = list(range(len(self.labels)))
        print("[INFO] Preparing train features...")
        train_features = run_classifier.convert_examples_to_features(
            train_inputExamples, label_list, self.max_seq_length, self.tokenizer)
        print("[INFO] Done preparing train features...\n")

        train_input_fn = run_classifier.input_fn_builder(
            features=train_features,
            seq_length=self.max_seq_length,
            is_training=True,
            drop_remainder=False)

        num_train_steps = \
            int(len(train_features)/self.train_batch_size*self.num_train_epochs)
        num_warmup_steps = int(num_train_steps * self.warmup_proportion)

        print(f"[INFO] No. of train steps: {num_train_steps}")
        print(f"[INFO] No. of warmup steps: {num_warmup_steps}")

        self.estimator = get_estimator(
            self.init_checkpoint, self.bert_config_file, self.labels,
            self.train_batch_size, self.model_dir,
            save_summary_steps=self.save_summary_steps,
            save_checkpoints_steps=self.save_checkpoints_steps,
            learning_rate=self.learning_rate, num_train_steps=num_train_steps,
            num_warmup_steps=num_warmup_steps)

        print(f'[INFO] Begin Training...!')
        current_time = datetime.now()
        self.estimator.train(input_fn=train_input_fn, max_steps=num_train_steps)
        print(f"[INFO] Training took time {datetime.now() - current_time} sec..!\n")

    def do_eval(self):
        print(f"[INFO] Started working on evaluation...")
        print("[INFO] Preparing test InputExample...")
        test_inputExamples = self.test.apply(
            lambda x: run_classifier.InputExample(
                guid=None,
                text_a=x['sentence'],
                text_b=None,
                label=x['label']), axis=1)
        print("[INFO] Done preparing test InputExample...\n")

        label_list = list(range(len(self.labels)))
        print("[INFO] Preparing test features...")
        test_features = run_classifier.convert_examples_to_features(
            test_inputExamples, label_list, self.max_seq_length, self.tokenizer)
        print("[INFO] Done preparing test features...\n")

        test_input_fn = run_classifier.input_fn_builder(
            features=test_features,
            seq_length=self.max_seq_length,
            is_training=False,
            drop_remainder=False)

        print(f'[INFO] Begin evaluating...!')
        result = self.estimator.evaluate(input_fn=test_input_fn, steps=None)
        print(f"[INFO] Done evaluating...\n")
        for key in sorted(result.keys()):
            print(f"[INFO]  {key} = {result[key]}")

    def predict(self, predict_file=None, text=None):
        if not (predict_file or text):
            raise Exception("Either of the predict_file or text should be provided")

        if predict_file:
            with open(predict_file) as f:
                pred_sentences = [line.strip() for line in f.readlines()]
        else:
            pred_sentences = [text.strip()]
        if len(pred_sentences) == 1:
            # Adding a dummy 2nd element so that the estimator does not throw Exception
            pred_sentences.append("")

        label_list = list(range(len(self.labels)))
        print(f"[INFO] Begin predicting...!")
        current_time = time()
        predictions = getPrediction(
            self.estimator, pred_sentences, labels=self.labels, label_list=label_list,
            max_seq_len=self.max_seq_length, tokenizer=self.tokenizer)
        if text:
            predictions = predictions[:1]
        print(f"[INFO] Predicting took {time() - current_time} secs...!\n")
        ret_predictions = []
        for pred in predictions:
            probabilities = pred[1]
            tops = np.argsort(probabilities)[::-1]
            top1_prob = probabilities[tops[0]]
            top2_prob = probabilities[tops[1]]
            second_top = self.labels[tops[1]]
            ret_predictions.append("TEXT: \"{}\" ==> {} {}".format(
                pred[0], pred[2], {pred[2]: top1_prob, second_top: top2_prob}))
        for ret_prediction in ret_predictions:
            print(ret_prediction)
        return ret_predictions


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-p', "--project", required=True)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--train", action='store_true')
    group.add_argument("--predict", action='store_true')
    group2 = parser.add_mutually_exclusive_group()
    group2.add_argument("--file", help="Path to the file with each line as a "
                                       "record to be classified")
    group2.add_argument("-t", "--text", help="Enter the text to classify")
    group2.add_argument("--skip-eval", action='store_true')
    args = parser.parse_args()

    if (args.skip_eval and args.predict) or (
            ((args.file or args.text) and args.train)):
        raise Exception("Invalid arguments combinations..!")

    if args.train:
        mode = "train"
    elif args.predict:
        if not(args.file or args.text):
            raise Exception("Either of `--predict-file` or `--text` "
                            "should be specified along with `--predict`")
        mode = 'predict'
    bc = BERTClassifier(project=args.project, mode=mode, skip_eval=args.skip_eval)
    if args.predict:
        bc.predict(args.file, args.text)


# from tensorflow.python.client import device_lib
# import numpy as np
# import tensorflow as tf
# import distutils
# import tensorflow_hub as hub
# import os
# import math
# import datetime
# from tqdm import tqdm
# import pandas as pd
# import numpy as np
# from tensorflow import keras
# import bert
# from bert import BertModelLayer
# from bert.loader import StockBertConfig, map_stock_config_to_params, load_stock_weights
# from bert.tokenization.bert_tokenization import FullTokenizer
# import seaborn as sns
# from pylab import rcParams
# import matplotlib.pyplot as plt
# from matplotlib.ticker import MaxNLocator
# from matplotlib import rc

# device_lib.list_local_devices()
# if distutils.version.LooseVersion(tf.__version__) < '2.0':
#     raise Exception('This notebook is compatible with TensorFlow 2.0 or higher.')
# tf.keras.backend.clear_session()
# resolver = tf.distribute.cluster_resolver.TPUClusterResolver(tpu='grpc://' + os.environ['COLAB_TPU_ADDR'])
# tf.config.experimental_connect_to_cluster(resolver)
# tf.tpu.experimental.initialize_tpu_system(resolver)
# print("All devices: ", tf.config.list_logical_devices('TPU'))
# sns.set(style='whitegrid', palette='muted', font_scale=1.2)

# HAPPY_COLORS_PALETTE = ["#01BEFE", "#FFDD00", "#FF7D00", "#FF006D", "#ADFF02", "#8F00FF"]

# sns.set_palette(sns.color_palette(HAPPY_COLORS_PALETTE))

# rcParams['figure.figsize'] = 12, 8

# RANDOM_SEED = 42

# np.random.seed(RANDOM_SEED)
# tf.random.set_seed(RANDOM_SEED)






# inputs = tokenizer.encode_plus(
#     text,
#     max_length=128,
#     padding="max_length",
#     truncation=True,
#     return_tensors="pt"
# )

# # Dự đoán ý định
# with torch.no_grad():
#     outputs = model(**inputs)
#     logits = outputs.logits

# # Lấy nhãn ý định dự đoán
# predicted_intent = torch.argmax(logits).item()





# sentence = "Cho tôi xem thời tiết ngày mai."
# encoded_input = tokenizer.encode_plus(
#     sentence,
#     max_length=128,
#     padding="max_length",
#     truncation=True,
#     return_tensors="pt"
# )
# input_ids = encoded_input["input_ids"]
# attention_mask = encoded_input["attention_mask"]

# # Tạo mô hình PhoBERT cho intent classification
# model = PhobertForSequenceClassification.from_pretrained("vinai/phobert-base", num_labels=num_labels)

# training_args = TrainingArguments(
#     output_dir="./results",
#     num_train_epochs=3,
#     per_device_train_batch_size=16,
#     per_device_eval_batch_size=64,
#     warmup_steps=500,
#     weight_decay=0.01,
#     logging_dir="./logs",
# )

# trainer = Trainer(
#     model=model,
#     args=training_args,
#     train_dataset=train_dataset,
#     eval_dataset=eval_dataset,
#     tokenizer=tokenizer,
# )

# trainer.train()

# INPUT TEXT MUST BE ALREADY WORD-SEGMENTED!

# input_ids = torch.tensor([tokenizer.encode(sentence)])

# with torch.no_grad():
#     features = phobert(input_ids)  # Models outputs are now tuples

## With TensorFlow 2.0+:
# from transformers import TFAutoModel
# phobert = TFAutoModel.from_pretrained("vinai/phobert-base")


