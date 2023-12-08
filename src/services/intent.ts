import axios from "axios";
const API_INTENT_URL =
  "https://api-inference.huggingface.co/models/yensubldg/model";

type Intent = {
  label: string;
  score: number;
  query: string;
};
/**
 * @description Intent recognition
 * @param {string} text - Text to be recognized
 * @returns {object} - Intent object
 */
export const recognizeIntent = async (text: string): Promise<Intent> => {
  const cleanText = text.replace(/[.,!?;:'"()[\]{}<>\\/|`~@#$%^&*_+=]/g, "");
  const response = await axios.post(
    API_INTENT_URL,
    {
      inputs: cleanText,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer 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",
      },
      withCredentials: false,
    }
  );

  return {
    label: response.data[0][0].label,
    score: response.data[0][0].score,
    query: text,
  };
};
