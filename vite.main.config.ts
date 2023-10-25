import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";

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
          // ignoreDynamicRequires: true,
        }),
      ],
    },
  },
  resolve: {
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
});
