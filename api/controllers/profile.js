const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.profileRead = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({ message: "UnauthorizedError: private profile" });
  } else {
    User.findById(req.payload._id).exec(function (err, user) {
      if (err) {
        return res.status(400).json(err);
      }
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(200).json(user);
    });
  }
};
