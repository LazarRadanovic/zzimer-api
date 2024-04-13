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

const sendMessage = async (
  sender_id: number,
  receiver_id: number,
  content: string,
  status: string,
  conversation_id: number
) => {
  const data = await messagesRepository.sendMessage(
    sender_id,
    receiver_id,
    content,
    status,
    conversation_id
  );
  return data;
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
  sendMessage,
};
