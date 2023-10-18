import re
from ctypes import cast, POINTER

from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
import pyautogui


class VolumeController:
    def __int__(self):
        pyautogui.FAILSAFE = True

    @staticmethod
    def reset_volume(volume):
        devices = AudioUtilities.GetSpeakers()
        interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume_object = cast(interface, POINTER(IAudioEndpointVolume))
        volume_object.SetMasterVolumeLevel(volume, None)

    def control_volume(self, cmd):
        VolumeController.reset_volume(-65.25)
        # cmd_name = re.search(r"(tăng|giảm)", cmd)
        cmd_number = re.search(r"\b\d+\b", cmd)
        # action_name = cmd_name.group(0)
        action_number = int(cmd_number.group())
        cmd_number = int(action_number / 2)
        print(cmd_number)
        for _ in range(cmd_number):
            pyautogui.press("volumeup")
        if(action_number % 2   == 0):
            pyautogui.press("volumedown")

if __name__ == "__main__":
    speech = "Tăng âm lượng lên 3 bước. Sau đó, giảm âm lượng đi 2 bước"
    volume_control = VolumeController()
    volume_control.control_volume(speech)
