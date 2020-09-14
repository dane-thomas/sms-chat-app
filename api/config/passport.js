const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          return done(err);
        }

        // user not found
        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }

        // incorrect password
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password",
          });
        }

        // correct user and password
        return done(null, user);
      });
    }
  )
);
