const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    id: String,
    //facility: String,
    bedNumber: Int,
    assignPersonal: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    assignPatient: [Patient]// Insert the patient object here.
  })
);

module.exports = Room;