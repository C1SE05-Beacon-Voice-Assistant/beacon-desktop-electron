/**
 * @description Get all conversation
 * @returns {Promise<Conversation[]>}
 */
export const getAllConversation = async () => {
  const conversations = fetch("/beacon_package/log/main.log");
  return conversations;
};
