const express = require('express');
const router = express.Router();
const ShedModel = require('../model/shed-data');
var moment = require('moment-timezone');

router.get('/getAll', async (req, res) => {
    try {
        var shed = await ShedModel.find();
        res.json(shed);
    } catch (error) {
        res.json({ message: error.message });
    }
})


router.post('/add', async (req, res) => {
    console.log("Added new Shed Value");
    try {
        const savedShed = await new ShedModel({
            rfid: req.body.rfid,
            pulseCount:parseFloat(req.body.pulseCount),
            date: moment(req.body.timestamp).tz("Asia/Colombo").format("YYYY-MM-DD"),
            timestamp: parseInt(req.body.timestamp),
        }).save();

        // res.json(savedGas);
        res.json({
            "code":200,
            "status":true,
            "message":"Successfully Saved"
        })
    } catch (error) {
        res.json({
            "code":400,
            "status":false,
            "message":error.message
        })
    }

});


module.exports = router;