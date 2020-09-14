require("./users");
const mongoose = require("mongoose");
const dbURI = process.env.DB_URI;

mongoose.set("useCreateIndex", true);
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connectino error: ${err}`);
});
mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose discoonnected`);
});
