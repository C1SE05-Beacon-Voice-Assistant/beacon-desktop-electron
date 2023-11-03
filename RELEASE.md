# Step by step from build to release

## Description

Step 1: Set Up Your Development Environment

- Install Node.js: Visit the official Node.js website
- Install Electron

```bash
npm install -g electron
```

Step 2: Create Your Electron Application

- Create a new directory for your Electron application.
- Initialize a new npm package by running the following command inside the directory:

```bash
npm init -y
```

- Install Electron as a dependency by running the following command:

```bash
npm install electron
```

Step 3: Implement Auto-Updater Functionality

- Install the electron-updater package by running the following command:

```bash
npm install electron-updater
```

- In [main.ts](./src/main.ts) file, add the following code to implement the auto-updater functionality:

```js
// Example
autoUpdater.setFeedURL({
  ....
});


autoUpdater
  .checkForUpdatesAndNotify({
        ....
  })
  .then(() => {
        .....
  })
  .catch(() => {
        .....
  });


// set path for logs root project in dev mode
if (process.env.NODE_ENV === "development") {
  log.transports.file.resolvePath = () =>
    join(__dirname + "/../../logs", "main.log");
} else {
  log.transports.file.resolvePath = () =>
    join(__dirname + "/../logs", "main.log");
}

// call checkForUpdatesAndNotify
if (require("electron-squirrel-startup")) app.quit();
Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});
```

Step 4: Build and Package Your Electron Application

- Add build and package scripts to your package.json file:

```json
"version": "1.0.0-alpha",
"scripts": {
    "start": "electron-forge start",
    "release": "electron-builder",
    "dist": "electron-builder build --win",
    "make": "electron-forge make",
},
"repository": {
    "type": "git",
    "url": "git+https://github.com/C1SE05-Beacon-Voice-Assistant/beacon-desktop-electron.git"
}
```

- Install the electron-builder, electron-log package by running the following command

```bash
npm install electron-builder --save-dev
npm install electron-log
```

- Configure the build options in electron-builder.json:

```json
{
  "productName": "Beacon",
  "appId": "com.beaconteam.autoupdater",
  "asar": true,
  "copyright": "Copyright @2023 Beacon Team",
  "directories": {
    "output": "release/${version}"
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      }
    ],
    "artifactName": "${productName}-Windows-${version}-Setup.${ext}",
    "publish": ["github"]
  },
  "nsis": {
    "oneClick": false,
    "perMachine": true,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "allowElevation": true,
    "deleteAppDataOnUninstall": true
  },
  "publish": {
    "provider": "github",
    "releaseType": "release",
    "private": true,
    "channel": "alpha"
  },
  "generateUpdatesFilesForAllChannels": true
}
```

- Set up a GitHub token for your Electron auto-updater in environment variables

```text
GH_TOKEN = ""
```

- Run the build command to generate the packaged application

```bash
npm run make
```

Step 5: Set Up Your Update Server

- Upload your application release files to the appropriate folders on the server.

Step 6: Release Your Electron Application

Distribute the packaged application generated in the previous step (located in the release directory) to your users through appropriate channels.

```bash
npm run release
```
