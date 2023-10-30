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

- Go back to the root directory

```bash
cd ..
```

- Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

- Install the required packages

```bash
npm install
```

## Usage

- Run the application in development mode

```bash
npm start
```

- Package the application (read [here](https://www.electronjs.org/docs/tutorial/application-distribution) for more information)

```bash
npm run package
```

## How it works

- See [preload.js](./electron/preload.js) for the code that handles the communication between the Electron app and the Python script.

```js
// Example
function wakeUp() {
  ...
}

contextBridge.exposeInMainWorld("electron", {
  wakeUp: wakeUp,
});
```

- See [Type](./src/types.d.ts) for the type definitions of the functions in [preload.js](./electron/preload.js)

```ts
// Example
export interface IElectron {
  wakeUp: () => void;
  // declare other functions here
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
```

- See [HomePage](./src/pages/home/index.tsx) for the code that calls the functions in [preload.js](./electron/preload.js)

```jsx
// Example
const HomePage = () => {
  ...
  return (
    <div>
      <button onClick={window.electron.wakeUp}>Send to Python</button>
    </div>
  )
  ...
}
```

## Give Command

### Read News

To give command about finding and reading the news, please give speech like this

```
  Tôi muốn đọc tin tức/bản tin/thời sự
  Tìm kiếm tin tức/bản tin/thời sự
```

Alternatively, for a shorter and equally effective command, you can say:

```
  bản tin/tin tức/thời sự
```

Beacon will give you a list with a limit of 3 articles for you to choose from.  
And to choose a specific article to read, please give a VERBAL speech like the following:

> [!Important]
> When it come to choose an article, please remember to be VERBAL

```
  Chọn tin tức/bản tin số 0/1/2
```

Don't say like this:

> [!Warning]
> Beacon will not understand what you want to do!

```
  Chọn 1
```

or

```
  1
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Security

See [SECURITY.md](./SECURITY.md) for more information.

## Authors (C1SE05)

- [Truong Thang](https://github.com/yensubldg)
- [Pham Quoc Bao](https://github.com/bd500)
- [Nguyen Van Vi](https://github.com/vdev0812)
- [Nguyen Trieu Tien](https://github.com/nguyentrieutien1)
- [Than Thi Thao](https://github.com/than11thao)
