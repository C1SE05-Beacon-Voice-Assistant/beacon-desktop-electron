import { recognizeIntent } from "~/services/intent";

const handleInput = async (
  input: string,
  history: object[],
  newsList: object[]
) => {
  // đọc hướng dẫn số 1

  // đọc tin tức số 1

  const intent = await recognizeIntent(input);
  // if intent include "Phẩy" => rerturn
  if (intent.query.toLowerCase().includes("phẩy")) return;
  const result = await window.electron.executeIntent(intent, history, newsList);

  if (result)
    return {
      // type: "gpt",
      type: intent.label,
      result,
    };
  return intent;
};

export default handleInput;
