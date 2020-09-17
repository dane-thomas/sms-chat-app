const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  number: String,
  user: mongoose.Schema.Types.ObjectId,
  lastMessageId: mongoose.Schema.Types.ObjectId,
  lastMessageSent: Date,
  lastMessageText: String,
});

mongoose.model("Conversation", conversationSchema);
