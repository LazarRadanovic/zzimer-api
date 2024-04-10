import messagesRepository from "../repositories/messages-repository";

const getAllConversations = async (loggedUserID: number) => {
  const data = await messagesRepository.getAllConversations(loggedUserID);
  return data;
};

const createConversation = async (senderId: number, receiverId: number) => {
  const data = await messagesRepository.createConversation(
    senderId,
    receiverId
  );
  return data;
};

const getConversationById = async (conversationId: number) => {
  const data = await messagesRepository.getConversationById(conversationId);
  return data;
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
};
