const express = require("express");
const router = express.Router();

const ctrlChat = require("../controllers/chat");

module.exports.chatRoutes = (auth) => {
  // conversation endpoints
  router.get("/conversations", auth, ctrlChat.conversationsRead);
  router.post("/conversation", auth, ctrlChat.createConversation);

  // message endpoints
  router.get("/messages", auth, ctrlChat.messagesRead);
  router.post("/message", auth, ctrlChat.sendMessage);

  return router;
};
