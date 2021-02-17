const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const WeatherSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    temperature: Number,
  humidity: Number,
  rainfall: Number,
  pressure: Number,
  wind_speed: Number,
  wind_direction: Number,
    date:String,
    timestamp:Number
    
}, {
    timestamps: true
});


module.exports = mongoose.model('weather', WeatherSchema);