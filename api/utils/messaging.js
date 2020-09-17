const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");

module.exports.createMessage = async (text, conversationId, sent) => {
  const message = new Message();

  message.message = text;
  message.conversation = conversationId;
  message.sent = sent;

  try {
    await message.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageId: message._id,
      lastMessageSent: message.sentAt,
      lastMessageText: text,
    });
    return message;
  } catch (error) {
    throw error;
  }
};
