import { recognizeIntent } from "~/services/intent";

async function executeIntentFromRenderer(intent: object, history: object[]) {
  try {
    const driver = await window.selenium.getDriver();
    if (driver) {
      const result = await window.electron.executeIntent(intent, history);
      return result;
    } else {
      console.error("Error initializing selenium driver");
      return null;
    }
  } catch (error) {
    console.error("Error executing intent from renderer:", error);
    return null;
  }
}

const handleInput = async (input: string, history: object[]) => {
  const intent = await recognizeIntent(input);
  // if intent include "Phẩy" => rerturn
  if (intent.query.toLowerCase().includes("phẩy")) return;
  const result = await executeIntentFromRenderer(intent, history);
  if (result)
    return {
      type: "gpt",
      result,
    };
  return intent;
};

export default handleInput;
