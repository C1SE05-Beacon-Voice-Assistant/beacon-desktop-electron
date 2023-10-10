# Beacon Desktop Application

## Description

This is the desktop application for the Beacon Voice Assistant. It is built using [Electron](https://www.electronjs.org/).

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download/) (version 18.18.0)
- Install [Python](https://www.python.org/downloads/release/python-390) (version 3.9.0)

## Installation

- Clone the repository

```bash
git clone https://github.com/C1SE05-Beacon-Voice-Assistant/beacon-desktop-electron.git beacon-desktop
```

- Run `npm install` in the root directory

```bash
npm install
```

- Go to the `beacon-package` directory

```bash
cd beacon-package
```

- Create virtual environment name `venv39` in the `beacon-package` directory

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

- Go back to the root directory

```bash
cd ..
```

- Run `npm run start` to start the application

```bash
  npm run start
```

## How it works

- See [preload.js](./electron/preload.js) for the code that handles the communication between the Electron app and the Python script.

```js
function sendToPython() {
  ...
}

contextBridge.exposeInMainWorld("electron", {
  sendToPython: sendToPython,
});
```

- See [HomePage](./src/pages/home/index.tsx) for the code that calls the functions in [preload.js](./electron/preload.js)

```jsx
const HomePage = () => {
  ...
  return (
    <div>
      <button onClick={window.electron.sendToPython}>Send to Python</button>
    </div>
  )
  ...
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
