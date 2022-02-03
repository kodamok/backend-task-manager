const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    match: /.+\@.+\..+/,
    required: true,
    verified: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },

  role: {
    type: String,
    default: "user",
    required: true,
  },

  versionKey: false,
});

const User = mongoose.connection.model("users", schema);

module.exports = User;
