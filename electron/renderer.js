/* eslint-disable @typescript-eslint/no-var-requires */
import "~/react";
import "~/index.css";

document.addEventListener("DOMContentLoaded", function () {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  console.log("message logged in view");
  let elemE = document.getElementById("message");
  elemE.innerHTML = message;
}
