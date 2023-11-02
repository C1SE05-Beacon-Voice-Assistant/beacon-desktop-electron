import pyaudio

def get_microphones():
    p = pyaudio.PyAudio()
    device_info = p.get_host_api_info_by_index(0)
    device_count = device_info.get('deviceCount')

    microphones = []
    for i in range(device_count):
        device = p.get_device_info_by_host_api_device_index(0, i)
        if device.get('maxInputChannels') > 0 and 'microphone' in device.get('name').lower():
            microphones.append(device.get('name'))

    p.terminate()
    return microphones

# Lấy danh sách các microphone
microphones = get_microphones()

def get_speakers():
    p = pyaudio.PyAudio()
    device_info = p.get_host_api_info_by_index(0)
    device_count = device_info.get('deviceCount')

    speakers = []
    for i in range(device_count):
        device = p.get_device_info_by_host_api_device_index(0, i)
        if device.get('maxOutputChannels') > 0 and 'speaker' in device.get('name').lower():
            speakers.append(device.get('name'))

    p.terminate()
    return speakers

# Lấy danh sách các loa
speakers = get_speakers()

# In danh sách các loa
# for i, speaker in enumerate(speakers):
#     print(f"Speaker {i + 1}: {speaker}")

# In danh sách các microphone
for i, microphone in enumerate(microphones):
    print(f"Microphone {i + 1}: {microphone}")
