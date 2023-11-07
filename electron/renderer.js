import "../src/react";
import "../src/index.css";

window.api.receive("before-quit", () => {
  console.log(`Received from main process`);
});
