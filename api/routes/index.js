const ctrlAuth = require("../controllers/authentication");
const ctrlProfile = require("../controllers/profile");

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const { check } = require("express-validator");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "payload",
});

const chatRoutes = require("./chat").chatRoutes(auth);

router.use("/chat", chatRoutes);

// profile
router.get("/profile", auth, ctrlProfile.profileRead);

// auth
router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .bail()
      .trim()
      .normalizeEmail(),
    check("firstName")
      .isLength({ min: 1 })
      .withMessage("First and last names are required")
      .trim(),
    check("lastName")
      .isLength({ min: 1 })
      .withMessage("First and last names are required")
      .trim(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .trim(),
  ],
  ctrlAuth.register
);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .bail()
      .trim()
      .normalizeEmail(),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Please enter a valid password")
      .trim(),
  ],
  ctrlAuth.login
);

module.exports = router;
