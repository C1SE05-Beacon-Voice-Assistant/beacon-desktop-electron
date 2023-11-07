# Step by step from build to release

## Manual Build and Release

Step 1: Set Up Your Development Environment

- Install Dependencies

```bash
npm install
```

Step 2: Build and Package Your Electron Application

- Add build and package scripts to your package.json file:

```json
"version": "<version>", // replace with your version
"scripts": {
    "dev": "vite",
    "make": "npm run build && electron-builder build --win",
    "build": "vite build",
    "release": "vite build && electron-builder --publish always",
    "lint": "eslint --ext .ts,.tsx ."
},
"repository": {
    "type": "git",
    "url": "git+https://github.com/C1SE05-Beacon-Voice-Assistant/beacon-desktop-electron.git"
}
```

- Set up a GitHub token for your Electron auto-updater in environment variables

```bash
# powershell
setx GH_TOKEN <your_token>
```

or edit in Environment Variables on your system

- Run the build command to generate the application and check that it runs correctly in `release` directory:

```bash
npm run make
```

Step 5: After checking that the application runs correctly, you can release it to your users.

```bash
npm run release
```

## Automatic Build and Release (only Scrum Master)
