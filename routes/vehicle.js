const express = require('express');
const router = express.Router();
const VehicleModel = require('../model/vehicle');
var moment = require('moment-timezone');

router.get('/getAll', async (req, res) => {
    try {
        var vehicle = await VehicleModel.find();
        res.json(vehicle);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/getlastValue/:vehicleID', async (req, res) => {
    try {
        var vehicle =await VehicleModel.findOne({'vehicleID':req.params.vehicleID},{},{ sort: { _id: -1 }, limit: 1});
        res.json(vehicle);
    } catch (error) {
        res.json({ message: error.message });
    }
})


router.post('/add', async (req, res) => {
    console.log("Added new Vehicle Value");
    try {
        const savedVehicle = await new VehicleModel({
            vehicleID:req.body.vehicleID,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            rfid:req.body.rfid,
            fmbdata:req.body.fmbdata==null?{}:{ "timestamp": req.body.fmbdata.timestamp,
            "latitude": req.body.fmbdata.latitude,
            "longitude": req.body.fmbdata.longitude,
            "altitude": req.body.fmbdata.altitude,
            "angle": req.body.fmbdata.angle,
            "speed": req.body.fmbdata.speed},
            date: moment().tz("Asia/Colombo").format("YYYY-MM-DD"),
            timestamp:moment().tz("Asia/Colombo").valueOf(),
           
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