const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const ShedSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    rfid: String,
    pulseCount: Number,
    date:String,
    timestamp:Number
    
}, {
    timestamps: true
});


module.exports = mongoose.model('shed', ShedSchema);