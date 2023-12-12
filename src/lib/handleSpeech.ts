import { recognizeIntent } from "~/services/intent";

const handleInput = async (input: string, history: object[], oldList?: any) => {
  const intent = await recognizeIntent(input);
  // if intent include "Phẩy" => rerturn
  if (intent.query.toLowerCase().includes("phẩy")) return;
  if (oldList.label) intent.label = oldList.label;
  const result = await window.electron.executeIntent(
    intent,
    history,
    oldList.newsList
  );

  if (result)
    return {
      // type: "gpt",
      type: intent.label,
      result,
    };
  return intent;
};

export default handleInput;
