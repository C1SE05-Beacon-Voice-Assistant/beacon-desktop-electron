import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        preload: "electron/preload.js",
        beacon_speech: "electron/beacon_speech.js",
        control_volume: "electron/control_volume.js",
        listen_to_music: "electron/listen_to_music.js",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
