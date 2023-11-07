import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        commonjs({
          dynamicRequireTargets: [
            "node_modules/selenium-webdriver/**/*.js",
            "node_modules/selenium-webdriver/**/**/*.js",
            "node_modules/selenium-webdriver/**/**/**/*.js",
            "node_modules/selenium-webdriver/**/**/**/**/*.js",
          ],
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "~": resolve(projectRootDir, "src"),
      loudness$: "mwl-loudness/index.js",
    },
  },
  plugins: [
    alias(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: "electron/preload.js",
        vite: {
          build: {
            rollupOptions: {
              input: {
                preload: "electron/preload.js",
                beacon_speech: "electron/beacon_speech.js",
                control_volume: "electron/control_volume.js",
                listen_to_music: "electron/listen_to_music.js",
                read_news_controller: "electron/read_news_controller.js",
                "helpers/driver": "electron/helpers/driver.js",
                "helpers/enum": "electron/helpers/enum.js",
                "helpers/newsReader": "electron/helpers/newsReader.js",
                detect_device: "electron/detect_device.js",
                detect_internet_status: "electron/detect_internet_status.js",
                "assets/Youtobe.mp3": "electron/voice/Youtobe.mp3",
              },
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].[ext]",
                assetFileNames: "assets/[name].[ext]",
                inlineDynamicImports: false,
              },
            },
          },
        },
      },
    }),
  ],
});
