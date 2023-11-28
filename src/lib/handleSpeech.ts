import { recognizeIntent } from "~/services/intent";

const handleInput = async (input: string) => {
  const intent = await recognizeIntent(input);
  return intent;
};

export default handleInput;
