from transformers import AutoModel, AutoTokenizer
def pre_train():
    tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")
    model = AutoModel.from_pretrained("vinai/phobert-base")
    return tokenizer, model

# Hàm load model BERT
def load_bert():
    v_phobert = AutoModel.from_pretrained("vinai/phobert-base")
    v_tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base", use_fast=False)
    return v_phobert, v_tokenizer
