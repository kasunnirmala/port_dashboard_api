const express = require('express');
const router = express.Router();
var moment = require('moment-timezone');
const WeatherModel = require('../model/weather');
router.get('/getAll', async (req, res) => {
    try {
        var weather = await WeatherModel.find();
        res.json(weather);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/data', async (req, res) => {
    console.log("Added new Weather Station Value");
    console.log(req.query);
    res.json({status:200});
})


module.exports = router;