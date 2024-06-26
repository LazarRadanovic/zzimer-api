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

    if (result.affectedRows > 0) {
      return { success: true, conversationId: result.insertId };
    } else {
      return { success: false };
    }
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
const sendMessage = async (
  sender_id: number,
  receiver_id: number,
  content: string,
  status: string,
  conversation_id: number
) => {
  try {
    const result = await dbConnection.dbConnection.query(
      `INSERT INTO messages(id,sender_id,receiver_id,content,timestamp,status,conversation_id) VALUES
      (DEFAULT,?,?,?,now(),?,?)`,
      [sender_id, receiver_id, content, status, conversation_id]
    );
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const changeStatus = async (conversation_id: number) => {
  try {
    const data = await dbConnection.dbConnection.query(
      `UPDATE messages SET status="seen" WHERE conversation_id=? `,
      [conversation_id]
    );
    if (data) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
  sendMessage,
  changeStatus,
};
