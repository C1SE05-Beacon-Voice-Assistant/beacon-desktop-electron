from transformers import AutoModel, AutoTokenizer
def pre_train():
    tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")
    phobert = AutoModel.from_pretrained("vinai/phobert-base-v2")
    return tokenizer, phobert
