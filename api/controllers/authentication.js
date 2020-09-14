const mongoose = require("mongoose");
const passport = require("passport");
const { validationResult } = require("express-validator");
const User = mongoose.model("User");

module.exports.register = async (req, res) => {
  // catch any validation errors before registering user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200);
    res.json({ token: token });
  } catch (error) {
    res.status(400).json({ errors: [error] });
  }
};

module.exports.login = (req, res) => {
  // catch any validation errors before attempting login
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    // Passport error
    if (err) {
      return res.status(400).json(err);
    }

    if (user) {
      // user found
      const token = user.generateJwt();
      res.status(200);
      res.json({ token: token });
    } else {
      //user not found
      res.status(401).json(info);
    }
  })(req, res);
};
