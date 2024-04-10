import dbConnection from "../common/db-connection";
import { Conversation } from "../model/Conversation";
import { Message } from "../model/Message";

const getAllConversations = async (loggedUserID: number) => {
  try {
    const data = await dbConnection.dbConnection.query(
      `SELECT * FROM conversation WHERE user_1=? OR user_2=?`,
      [loggedUserID, loggedUserID]
    );
    const result: Conversation[] = [];
    data.forEach((element: Conversation) => {
      const con: Conversation = {
        id: element.id,
        user_1: element.user_1,
        user_2: element.user_2,
      };
      result.push(con);
    });
    return result;
  } catch (e) {
    return { success: false };
  }
};

const createConversation = async (senderId: number, receiverId: number) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `INSERT INTO conversation(id,user_1,user_2) VALUES (DEFAULT,?,?)`,
      [senderId, receiverId]
    );
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

const getConversationById = async (conversationId: number) => {
  try {
    const data = await dbConnection.dbConnection.query(
      `SELECT * FROM messages WHERE conversation_id = ?`,
      [conversationId]
    );
    const result: Message[] = [];
    data.forEach((element: Message) => {
      const message: Message = {
        id: element.id,
        sender_id: element.sender_id,
        receiver_id: element.receiver_id,
        status: element.status,
        content: element.content,
        timestamp: element.timestamp,
        conversation_id: element.conversation_id,
      };
      result.push(message);
    });
    return result;
  } catch (e) {
    return { success: false };
  }
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
};
