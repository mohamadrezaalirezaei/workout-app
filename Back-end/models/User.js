const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  repeatPassword: {
    type: String,
    required: [true, "Please repeat your password"],
  },
});

module.exports = mongoose.model("User", userSchema);
