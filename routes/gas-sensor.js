const express = require('express');
const router = express.Router();
const GasModel = require('../model/gas-sensor');
var moment = require('moment-timezone');

router.get('/getAll', async (req, res) => {
    try {
        var gases = await GasModel.find();
        res.json(gases);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/getlastValue/:gas', async (req, res) => {
    try {
        var gases =await GasModel.findOne({'gasName':req.params.gas.toUpperCase()},{},{ sort: { _id: -1 }, limit: 1});
        res.json(gases);
    } catch (error) {
        res.json({ message: error.message });
    }
})


router.post('/add', async (req, res) => {
    console.log("Added new Gas Sensor Value");
    try {
        const savedGas = await new GasModel({
            gasName: req.body.gasName,
            value:parseFloat(req.body.value),
            date: moment().tz("Asia/Colombo").format("YYYY-MM-DD"),
            timestamp: moment().tz("Asia/Colombo").valueOf()
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