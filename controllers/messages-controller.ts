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
      parseInt(req.body.conversationId as string)
    )
  );
};

export default {
  getAllConversations,
  createConversation,
  getConversationById,
};
