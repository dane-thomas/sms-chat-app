const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  conversation: mongoose.Schema.Types.ObjectId,
  sent: Boolean,
  sentAt: { type: Date, default: Date.now },
});

mongoose.model("Message", messageSchema);
