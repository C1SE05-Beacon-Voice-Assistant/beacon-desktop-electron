import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";
import { readdirSync } from "fs";
import { viteStaticCopy } from "vite-plugin-static-copy";

const projectRootDir = resolve(__dirname);

const electronPath = readdirSync(resolve(__dirname, "electron"))
  .filter((file) => file.endsWith(".js"))
  .reduce((acc, file) => {
    if (file === "renderer.js") return acc;
    acc[file.replace(".js", "")] = "electron/" + file;
    return acc;
  }, {});

const helpersPath = readdirSync(resolve(projectRootDir, "electron/helpers"))
  .filter((file) => file.endsWith(".js"))
  .reduce((acc, file) => {
    const filePath = "helpers/" + file.replace(".js", "");
    acc[filePath] = "electron/" + filePath + ".js";
    return acc;
  }, {});

console.log(resolve(projectRootDir, "dist-electron/assets"));

const config = defineConfig({
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
    viteStaticCopy({
      targets: [
        {
          src: resolve(projectRootDir, "public/assets"),
          dest: resolve(projectRootDir, "dist-electron/assets"),
        },
      ],
    }),
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
                start: "electron/start.js",
                detect_internet_status: "electron/detect_internet_status.js",
                "assets/Youtube.mp3": "electron/assets/Youtube.mp3",
                "assets/Mp3.mp3": "electron/assets/Mp3.mp3",
                "assets/ReadNews.mp3": "electron/assets/ReadNews.mp3",
                "assets/InVolume.mp3": "electron/assets/InVolume.mp3",
                "assets/DeVolume.mp3": "electron/assets/DeVolume.mp3",
                "assets/Mute.mp3": "electron/assets/Mute.mp3",
                "assets/Unmute.mp3": "electron/assets/Unmute.mp3",
                "assets/Internet.mp3": "electron/assets/Internet.mp3",
                ...electronPath,
                ...helpersPath,
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

export default config;
