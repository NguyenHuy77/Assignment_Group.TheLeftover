const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  nationalId: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
