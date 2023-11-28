import axios from "axios";
const API_INTENT_URL = "https://api.beacon.id.vn";

/**
 * @description Intent recognition
 * @param {string} text - Text to be recognized
 * @returns {object} - Intent object
 */
export const recognizeIntent = async (text: string): Promise<object> => {
  const response = await axios.post(
    `${API_INTENT_URL}/intent`,
    {
      query: text,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    }
  );
  return response.data;
};