import axios from "~/lib/axios";

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
  const userId = await window.electron.getUserId();
  if (!userId) throw new Error("User not found");
  const cleanText = text.replace(/[.,!?;:'"()[\]{}<>\\/|`~@#$%^&*_+=]/g, "");
  const response = await axios.post("/intent", {
    user_id: userId._id,
    query: cleanText,
  });

  return {
    label: response.data.result.label,
    score: response.data.result.score,
    query: text,
  };
};
