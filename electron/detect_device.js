const { execSync } = require('child_process');

function detectMicrophones() {
  try {
    const command = 'powershell -Command "Get-WmiObject Win32_SoundDevice | Where-Object { $_.Status -eq \'OK\' } | Select-Object Name"';
    const output = execSync(command).toString();

    const microphones = output.split('\n').map((line) => {
      const match = line.match(/Name\s*:\s*(.+)/);
      return match ? match[1] : null;
    }).filter(Boolean);

    return microphones;
  } catch (error) {
    console.error('Lỗi phát hiện microphone:', error);
    return [];
  }
}

function detectSpeakers() {
  try {
    const command = 'powershell -Command "Get-WmiObject Win32_SoundDevice | Where-Object { $_.Status -eq \'OK\' } | Select-Object Name"';
    const output = execSync(command).toString();

    const speakers = output.split('\n').map((line) => {
      const match = line.match(/Name\s*:\s*(.+)/);
      return match ? match[1] : null;
    }).filter(Boolean);

    return speakers;
  } catch (error) {
    console.error('Lỗi phát hiện loa:', error);
    return [];
  }
}

const speakers = detectSpeakers();
console.log('Đã phát hiện Loa:', speakers);

const microphones = detectMicrophones();
console.log('Đã phát hiện Microphone:', microphones);
