const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: String,
    name: String,
    nationalId: String,
    phoneNumber: String,
    workPlace: String,
    username: String,
    email: String,
    password: String,
    role: String,
  })
);

module.exports = User;
