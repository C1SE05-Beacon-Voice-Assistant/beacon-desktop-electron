import { recognizeIntent } from "~/services/intent";

const handleInput = async (input: string) => {
  const intent = await recognizeIntent(input);
  // if intent include "Phẩy" => rerturn
  if (intent.query.toLowerCase().includes("phẩy")) return;
  await window.electron.executeIntent(intent);
  return intent;
};

export default handleInput;
