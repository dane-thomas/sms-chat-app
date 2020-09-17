const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");
const Message = mongoose.model("Message");

const createMessage = require("../utils/messaging").createMessage;

module.exports.startChat = (io) => {
  // set socket listeners
  io.on("connection", (socket) => {
    console.log(`Connected ${socket.id}`);

    io.on("sms-received", () => {
      //TODO
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });

  router.get("/sms", async (req, res, next) => {
    try {
      // find conversation
      const conversationId = await Conversation.findOne()
        .where("number", req.query.From)
        .select("_id")
        .exec();
      // save message in db
      const message = await createMessage(
        req.query.Body,
        conversationId,
        false
      );
      console.log(message);
      io.emit("sms-received", message);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  return router;
};
