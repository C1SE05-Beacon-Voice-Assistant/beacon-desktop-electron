import os

import numpy as np
import torch
from transformers import BertForSequenceClassification, AutoTokenizer, AutoConfig

# PATH
base_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(base_dir, 'phobert-base', 'config.json')
model_path = os.path.join(base_dir, 'phobert-base', 'model.bin')

model_train_path = os.path.join(base_dir, 'model', 'model_epoch9.pt')


class RunModel:
    def __init__(self):
        from transformers import logging
        import warnings
        warnings.filterwarnings('ignore', category=UserWarning, message='TypedStorage is deprecated')
        logging.set_verbosity_error()

        self.classes = ['listen_to_music', 'read_news', 'user_manual', 'decrease_volume', 'default_volume',
                        'end_of_content', 'hottest_news', 'increase_volume', 'lastest_news', 'max_volume',
                        'middle_of_content', 'min_volume', 'most_read_news', 'mute', 'next_content', 'pause_content',
                        'play_music', 'pre_content', 'restart_content', 'resume_content', 'stop_content', 'un_mute']

        self.tokenizer = AutoTokenizer.from_pretrained(
            "vinai/phobert-base",
            use_fast=False
        )

        config = AutoConfig.from_pretrained(
            config_path,
            num_labels=len(self.classes)
        )
        self.model = BertForSequenceClassification.from_pretrained(
            model_path,
            config=config
        )

        model_state_dict = torch.load(model_train_path, map_location=torch.device('cpu'), weights_only=True)[
            'model_state_dict']

        new_state_dict = {}
        for key, value in model_state_dict.items():
            new_key = key.replace("bert_classifier.", "")  # Modify the key names if needed
            new_state_dict[new_key] = value

        self.model.load_state_dict(new_state_dict)
        self.model.eval()

    def predict(self, text):
        # Using tokenizer.encode for faster tokenization
        encoding = self.tokenizer.encode(
            text,
            add_special_tokens=True,
            return_tensors='pt'  # Returns PyTorch tensors
        )

        with torch.no_grad():
            # Removed padding since encode doesn't pad
            logits = self.model(
                input_ids=encoding,
            )[0]

            probs = torch.softmax(logits, dim=1).detach().numpy()[0]
            pred = np.argmax(probs)
            return self.classes[pred]


if __name__ == '__main__':
    import time

    start = time.time()
    model = RunModel()
    print(model.predict("Nghe lại tin tức"))
    print(time.time() - start, "s")
