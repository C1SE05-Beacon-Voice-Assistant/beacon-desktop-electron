import { recognizeIntent } from "~/services/intent";

const handleInput = async (input: string, history: object[]) => {
  const intent = await recognizeIntent(input);
  // if intent include "Phẩy" => rerturn
  if (intent.query.toLowerCase().includes("phẩy")) return;
  const result = await window.electron.executeIntent(intent, history);
  if (result)
    return {
      type: "gpt",
      result,
    };
  return intent;
};

export default handleInput;
