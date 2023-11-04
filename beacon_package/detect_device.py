import pyaudio

def get_audio_input():
    p = pyaudio.PyAudio()
    result = []
    for i in range(p.get_device_count()):
        device_info = p.get_device_info_by_index(i)
        if device_info['maxInputChannels'] > 0 and device_info['hostApi'] == 0:
            result.append((i, device_info['name']))
    p.terminate()

    return result

def get_audio_output():
    p = pyaudio.PyAudio()
    result = []
    for i in range(p.get_device_count()):
        device_info = p.get_device_info_by_index(i)
        if device_info['maxOutputChannels'] > 0 and device_info['hostApi'] == 0:
            result.append((i, device_info['name']))
    
    p.terminate()

    return result

if __name__ == "__main__":
    input_devices = get_audio_input()
    output_devices = get_audio_output()
    
    for ide in input_devices:
        print(ide)
    for ode in output_devices:
        print(ode)






