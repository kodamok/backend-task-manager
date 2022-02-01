const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  admin: String,

  user: String,
});

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
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },

  role: roleSchema,

  versionKey: false,
});

const User = mongoose.connection.model("users", schema);

module.exports = User;
