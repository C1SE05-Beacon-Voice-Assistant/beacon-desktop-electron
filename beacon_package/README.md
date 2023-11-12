# How to use models

## Prerequisites

- Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

- Create virtual environment name `venv39` in the `beacon_package` directory

```bash
python -m venv venv39
```

- Activate the virtual environment

```bash
venv39\Scripts\activate.bat
or
source venv39/Scripts/activate
```

- Install the required packages

```bash
pip install -r requirements.txt
```

## For keyword recognition

### Download the model

- Download the model from [here](https://drive.google.com/file/d/1ONfdlW9YaY7E72WkTM5iDe0O8sQaJZi7/view?usp=drive_link)

### Extract the model for keyword recognition

- Extract the model to `beacon_package` directory
- The file should be named `final_highfa.table`

## For intent recognition

### Download the model and phobert-base

- Download phobert-base [here](https://public.vinai.io/PhoBERT_base_transformers.tar.gz) and extract it to `beacon_package/intent_recognition` directory with name `phobert-base`

- Download model (if exist) [here](https://drive.google.com/drive/folders/1-LqljTTvDh4KK8lh2kNxK_pGF_BYQ-4V?usp=drive_link) and extract it to `beacon_package/intent_recognition` directory with name `model`

### Train model

- Run `main` function in file [intent_recognition/intent_recognition2.py](./intent_recognition/intent_recognition.py) to train model

### Test model

- Init class RunModel `run_model = RunModel()` in file [intent_recognition/intent_recognition2.py](./intent_recognition/intent_recognition.py) to load model and tokenizer
- And use `predict` function like `label1, text1 = run_model.predict("Tin tức gì mới nhất hôm nay")` to get predict many times without wasting much time reloading the model
