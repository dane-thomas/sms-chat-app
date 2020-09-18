if (process.env.NODE_ENV !== "production") require("dotenv").config();

require("./api/models/db");
require("./api/config/passport");

const cookuieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");
const Socket = require("socket.io");

const io = Socket();

const routesAPI = require("./api/routes/index");
const chatAPI = require("./api/chat/chat").startChat(io);

const app = express();
app.io = io;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookuieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use("/api", routesAPI);
app.use("/api/chat", chatAPI);

// serve client
app.use("/", express.static(path.join(__dirname, "./client/dist/client")));
app.all("*", function (req, res) {
  res.status(200).sendFile(`/`, { root: "./client/dist/client" });
});

// catch 404 and send to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// catch unauthorized errors
app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

// error handler
app.use((err, req, res, next) => {
  // set locals
  res.locals.message = err.message;
  // only pass error in development
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
