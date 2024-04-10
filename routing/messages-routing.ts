import express from "express";
import messagesController from "../controllers/messages-controller";

const messagesRoutes = express.Router();

messagesRoutes
  .route("/conversations")
  .get(messagesController.getAllConversations);

messagesRoutes
  .route("/conversations")
  .post(messagesController.createConversation);

messagesRoutes.route("/messages").post(messagesController.getConversationById);
export default {
  messagesRoutes,
};
