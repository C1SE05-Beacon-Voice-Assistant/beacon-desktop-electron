# from vncorenlp import VnCoreNLP
# rdrsegmenter = VnCoreNLP("E:/PROJECT/beacon-desktop-electron/beacon_package/vncorenlp\VnCoreNLP-1.1.1.jar", annotators="wseg", max_heap_size='-Xmx500m')
#
# text = "Tôi muốn đọc báo."
#
# word_segmented_text = rdrsegmenter.tokenize(text)
# print(word_segmented_text)

from fairseq.data.encoders.fastbpe import fastBPE
from fairseq.data import Dictionary
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--bpe-codes',
    default="E:/PROJECT/beacon-desktop-electron/beacon_package/PhoBERT_base_transformers/bpe.codes",
    required=False,
    type=str,
    help='path to fastBPE BPE'
)
args, unknown = parser.parse_known_args()
bpe = fastBPE(args)

# Load the dictionary
vocab = Dictionary()
vocab.add_from_file("E:/PROJECT/beacon-desktop-electron/beacon_package/PhoBERT_base_transformers/dict.txt")
