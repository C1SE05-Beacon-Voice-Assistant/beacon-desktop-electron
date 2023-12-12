import axios from "axios";
const API_INTENT_URL = "https://api.beacon.id.vn/intent";

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
      query: cleanText,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return {
    label: response.data.result.label,
    score: response.data.result.score,
    query: text,
  };
};
