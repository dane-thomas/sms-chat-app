const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");
const twilio = require("twilio");

const createMessage = require("../utils/messaging").createMessage;

// get all conversations for a user
module.exports.conversationsRead = async (req, res) => {
  if (!req.payload._id) {
    res
      .status(401)
      .json({ message: "UnauthorizedError: login to get user conversations" });
  } else {
    try {
      const conversations = await Conversation.find()
        .where("user", req.payload._id)
        .exec();
      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

// create a new conversation from user to a number
module.exports.createConversation = async (req, res) => {
  if (!req.payload._id) {
    res
      .status(401)
      .json({ message: "UnauthorizedError: login to get messages" });
  } else {
    if (!req.body.number) {
      return res
        .status(400)
        .json({ message: "Target number missing in request" });
    }

    const conversation = new Conversation();

    conversation.user = req.payload._id;
    conversation.number = req.body.number;
    conversation.lastMessageId = null;
    conversation.lastMessageSent = null;
    conversation.lastMessageText = null;

    try {
      await conversation.save();
      return res.status(200).json(conversation);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

// get messages for a conversation
module.exports.messagesRead = async (req, res) => {
  if (!req.payload._id) {
    res
      .status(401)
      .json({ message: "UnauthorizedError: login to get messages" });
  } else {
    if (!req.query.conversationId) {
      return res
        .status(400)
        .json({ message: "Conversation id is missing in request" });
    }
    try {
      const messages = await Message.find()
        .where("conversation", req.query.conversationId)
        .exec();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

// save message to db and send via twilio
module.exports.sendMessage = async (req, res) => {
  if (!req.payload._id) {
    res
      .status(401)
      .json({ message: "UnauthorizedError: login to get messages" });
  } else {
    if (!req.body.to || !req.body.message || !req.body.conversationId) {
      return res.status(400).json({ message: "Missing values in request" });
    }

    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    try {
      // send message via twilio
      const message = await client.messages.create({
        body: req.body.message,
        from: process.env.TWILIO_NUMBER,
        to: req.body.to,
      });
      // save message to db
      const savedMessage = await createMessage(
        req.body.message,
        req.body.conversationId,
        true
      );
      return res.status(200).json(savedMessage);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
