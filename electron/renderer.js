import "../src/react";
import "../src/index.css";

window.electronAPI.quitDriver(() => {
  window.electron.quitDriver();
});
