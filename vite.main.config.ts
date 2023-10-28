import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
  server: {
    port: 3000,
  },
});
