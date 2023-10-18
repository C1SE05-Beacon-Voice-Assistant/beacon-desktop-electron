import re
from ctypes import cast, POINTER

import pyautogui
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume


class VolumeController:
    """
    A class used to control the system volume using the Windows Core Audio API and PyAutoGUI.

    ...

    Methods
    -------
    reset_volume(volume)
        Resets the system volume to the specified level.
    control_volume(cmd)
        Controls the system volume based on the given command.
    """

    def __int__(self):
        pyautogui.FAILSAFE = False

    @staticmethod
    def reset_volume(volume):
        """
        Resets the system volume to the specified level.

        Parameters
        ----------
        volume : float
            The desired volume level in decibels (dB).

        Returns
        -------
        None
        """
        devices = AudioUtilities.GetSpeakers()
        interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume_object = cast(interface, POINTER(IAudioEndpointVolume))
        volume_object.SetMasterVolumeLevel(volume, None)

    def control_volume(self, cmd):
        """
        Controls the system volume based on the given command.

        Parameters
        ----------
        cmd : str
            The command to execute. Must contain a number indicating the desired volume level.

        Returns
        -------
        None
        """
        VolumeController.reset_volume(-65.25)
        cmd_number = re.search(r"\b\d+\b", cmd)
        action_number = int(cmd_number.group())
        cmd_number = int(action_number / 2)
        print(cmd_number)
        for _ in range(cmd_number):
            pyautogui.press("volumeup")


if __name__ == "__main__":
    speech = "Tôi muốn đặt âm lượng ở mức 31"
    volume_control = VolumeController()
    volume_control.control_volume(speech)
