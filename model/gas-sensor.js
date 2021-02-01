const mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const BatchSchema = new mongoose.Schema({
    _id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
    gasName: String,
    value: Number,
    date:String,
    timestamp:Number
    
}, {
    timestamps: true
});


module.exports = mongoose.model('gas', BatchSchema);