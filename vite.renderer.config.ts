import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(projectRootDir, "src"),
    },
  },
  plugins: [alias()],
});
