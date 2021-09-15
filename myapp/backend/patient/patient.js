const mongoose= require('mongoose');

const patientSchema= mongoose.Schema({
    patientName: {type: String, require: true},
    age: {type: Number, require: true},
    nationalID: {type: String, require: true},
    address: {type: String, require: true},
    relationNumber:{type: String},
    roomNumber:{type: String, require: true},
    day:{type: Number, require: true, min:1},
    symptoms:{type: String, require: true},
    testResults:[{
        result:{type: String, require: true},
        dateTest:{type: Date, require: true},
        testTime:{ type: Number,require: true},
        nurse:{type: String, require: true}
    }],
    healthStatus:{type: String, require: true},
    procession:{type: String, require: true}
});

module.exports= mongoose.model('patient', patientSchema);