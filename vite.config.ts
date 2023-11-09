import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";
import { readdirSync } from "fs";

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
      output: {
        manualChunks: undefined,
      },
    },
    chunkSizeWarningLimit: 1000,
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
                ...electronPath,
                ...helpersPath,
              },
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
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
