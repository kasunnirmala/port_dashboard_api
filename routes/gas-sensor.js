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


router.post('/add', async (req, res) => {
    console.log("Add new");
    try {
        const savedGas = await new GasModel({
            gasName: req.body.gasName,
            value:parseFloat(req.body.value),
            date: moment().tz("Asia/Colombo").format("YYYY-MM-dd"),
            timestamp: moment().tz("Asia/Colombo").valueOf()
        }).save();

        res.json(savedGas);
    } catch (error) {
        res.json({ message: error.message });
    }

});


router.post('/update', async (req, res) => {
    console.log("Updated");
    try {
        var updatedBatch = await BatchModel.updateOne(
            { batch_id: req.body.batch_id },
            {
                $set: {
                    status: false,
                    stop_time: moment().tz("Asia/Colombo").format("YYYY-MM-dd HH:mm:ss"),
                }
            });
        res.json(updatedBatch);
    } catch (error) {
        res.json({ message: error.message });
    }

});


module.exports = router;