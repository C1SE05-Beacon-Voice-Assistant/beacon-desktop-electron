from unittest import TestCase
from unittest.mock import Mock
import unittest

from beacon_package.speech_to_text import BeaconSpeech


class TestBeaconSpeech(unittest.TestCase):
    def setUp(self):
        self.beacon = BeaconSpeech("Beacon", "Hanoi")

    def test_recognize_from_microphone(self):
        # Test that the recognize_from_microphone function returns a correct string
        self.beacon.recognizer = Mock()
        self.beacon.recognizer.listen = Mock(return_value="Hello")
        self.assertEqual(self.beacon.recognize_from_microphone(), "Hello")

    def test_str(self):
        # Test that the __str__ function returns a string
        self.assertIsInstance(str(self.beacon), str)

    def test_recognize_from_file(self):
        file_name = "tests/data/01.wav"
        expected_text = "Chúng ta đang làm gì thế này?"
        self.assertEqual(self.beacon.recognize_from_file(file_name), expected_text)


if __name__ == '__main__':
    unittest.main()
