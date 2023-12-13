import axios from "axios";
const API_INTENT_URL = "http://localhost:8000/intent";

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
      user: '654f6b55388deecbf94c17c0',
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
