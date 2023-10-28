import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "~": resolve(projectRootDir, "src"),
    },
  },
  plugins: [alias()],
  server: {
    port: 3000,
  },
});
