const mongoose = require ('mongoose')

const testSchema = mongoose.Schema ({
    patientID: {type: String,default:null},
    date: {type: String, default:null},
    testTime: {type: String, default: null},
    result: {type: String, default: null},
    testUser: {type: String, default: null}
})

module.exports = mongoose.model("test", testSchema);