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
    var datapack=req.query;
    var datakey=(Object.keys(datapack)[Object.keys(datapack).length - 1]).toString();
    var dataArr=datakey.split(";")
    if(dataArr.length==6){
        try {
            const savedWeather = await new WeatherModel({
                temperature:parseFloat(dataArr[0].split(":")[1]),
                humidity: parseFloat(dataArr[1].split(":")[1]),
                rainfall: parseFloat(dataArr[2].split(":")[1]),
                pressure: parseFloat(dataArr[3].split(":")[1]),
                wind_speed: parseFloat(dataArr[4].split(":")[1]),
                wind_direction:parseFloat( dataArr[5].split(":")[1]),
                date: moment().tz("Asia/Colombo").format("YYYY-MM-DD"),
                timestamp:moment().tz("Asia/Colombo").valueOf(),
               
            }).save();

    console.log("Successfully Weather Saved");
           console.log(savedWeather);
        } catch (error) {
          console.log(error.message);
        }
    }
    res.json({status:200});
})


module.exports = router;