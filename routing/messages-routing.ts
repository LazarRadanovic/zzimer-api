import express from "express";
import messagesController from "../controllers/messages-controller";

const messagesRoutes = express.Router();

messagesRoutes
  .route("/conversations")
  .get(messagesController.getAllConversations);

messagesRoutes
  .route("/conversations")
  .post(messagesController.createConversation);

messagesRoutes.route("/send-message").post(messagesController.sendMessage);

messagesRoutes.route("/change-status").post(messagesController.changeStatus);

messagesRoutes.route("/messages").get(messagesController.getConversationById);
export default {
  messagesRoutes,
};
