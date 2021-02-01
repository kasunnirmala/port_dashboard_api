const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const WeatherSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    date:String,
    timestamp:Number
    
}, {
    timestamps: true
});


module.exports = mongoose.model('weather', WeatherSchema);