import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(projectRootDir, "src"),
      loudness$: "mwl-loudness/index.js",
    },
  },
  plugins: [alias()],
  server: {
    cors: false,
    host: true,
    port: 3000,
  },
});
