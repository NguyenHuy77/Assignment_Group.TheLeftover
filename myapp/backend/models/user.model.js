const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: String,
    name: String,
    nationalId: String,
    phoneNumber: String,
    workPlace: String,
    role: String,
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
