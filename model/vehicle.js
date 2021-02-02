const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const VehicleSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    vehicleID:String,
    latitude: String,
    longitude: Number,
    rfid:String,
    fmbdata:{},
    timestamp:Number,
    date:String
    
}, {
    timestamps: true
});


module.exports = mongoose.model('vehicle', VehicleSchema);