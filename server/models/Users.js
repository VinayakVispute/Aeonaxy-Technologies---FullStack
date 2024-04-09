const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
  },
  username: {
    type: String,
    require: [true, "Please provide a username"],
  },
  email: {
    type: String,
    require: [true, "Please provide an email"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
  avatar: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: [true, "Please provide a location"],
  },
  purpose: {
    type: String,
    enum: ["Designer", "Hiring", "Inspiration"],
    require: [true, "Please provide a purpose"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
