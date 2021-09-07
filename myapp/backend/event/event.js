const mongoose = require ('mongoose')

const eventSchema = mongoose.Schema ({
    userID: {type: String,default:null},
    date: {type: String, default:null},
    room: {type: String, default: null}
})

module.exports = mongoose.model("event", eventSchema);