import { Request, Response } from "express";
import messagesService from "../services/messages-service";

const getAllConversations = async (req: Request, res: Response) => {
  res.send(
    await messagesService.getAllConversations(
      parseInt(req.query.loggedUserId as string)
    )
  );
};

const createConversation = async (req: Request, res: Response) => {
  const senderId: number = parseInt(req.body.senderId);
  const receiverId: number = parseInt(req.body.receiverId);
  res.send(await messagesService.createConversation(senderId, receiverId));
};

const getConversationById = async (req: Request, res: Response) => {
  res.send(
    await messagesService.getConversationById(
      parseInt(req.query.conversationId as string)
    )
  );
};

const sendMessage = async (req: Request, res: Response) => {
  const sender_id = parseInt(req.body.sender_id as string);
  const receiver_id = parseInt(req.body.receiver_id as string);
  const content = req.body.content as string;
  const status = req.body.status as string;
  const conversation_id = parseInt(req.body.conversation_id as string);
  res.send(
    await messagesService.sendMessage(
      sender_id,
      receiver_id,
      content,
      status,
      conversation_id
    )
  );
};
const changeStatus = async (req: Request, res: Response) => {
  const conversation_id = parseInt(req.body.conversation_id);
  res.send(await messagesService.changeStatus(conversation_id));
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
  sendMessage,
  changeStatus,
};
