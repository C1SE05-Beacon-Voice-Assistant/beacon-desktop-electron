from transformers import AutoModel, AutoTokenizer
def pre_train():
    tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-large")
    model = AutoModel.from_pretrained("vinai/phobert-base")
    return tokenizer, model
