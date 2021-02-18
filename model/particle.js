const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const ParticleSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    sensorName: String,
    pm10_standard: Number,
    pm25_standard: Number,
    pm100_standard: Number,
    pm10_env: Number,
    pm25_env: Number,
    pm100_env: Number,
    date:String,
    timestamp:Number
    
}, {
    timestamps: true
});


module.exports = mongoose.model('particle', ParticleSchema);