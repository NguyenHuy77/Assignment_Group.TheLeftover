const mongoose= require('mongoose');

const roomSchema= mongoose.Schema({
    roomNumber: {
        type: String ,
        require: true
    },
    roomType: {
        type: String,
        require: true
    },
    bedCounts: {
        type: String,
        require: true
    }

});

module.exports= mongoose.model('room', roomSchema);