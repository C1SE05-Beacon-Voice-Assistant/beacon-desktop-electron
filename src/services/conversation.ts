import axios from "~/lib/axios";

/**
 * @description Get all conversation by mac address
 * @returns {Promise<Conversation[]>}
 */
export const getAllConversation = async () => {
  const userId = await window.electron.getUserId();
  if (!userId) throw new Error("User not found");
  const data = await axios.get(`api/data/user/${userId._id}`);
  return data;
};
