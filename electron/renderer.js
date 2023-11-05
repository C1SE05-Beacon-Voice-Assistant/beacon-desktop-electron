import "../src/react";
import "../src/index.css";

window.electronAPI.onBeforeQuit((event) => {
  event.sender.send("on-quit", "quitting");
});
