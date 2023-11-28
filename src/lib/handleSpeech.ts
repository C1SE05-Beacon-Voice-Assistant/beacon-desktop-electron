import { recognizeIntent } from "~/services/intent";

const handleInput = async (input: string) => {
  const intent = await recognizeIntent(input);
  await window.electron.executeIntent(intent);
  return intent;
};

export default handleInput;
