const express = require('express');
const router = express.Router();
const ParticleModel = require('../model/particle');
var moment = require('moment-timezone');

router.get('/getAll', async (req, res) => {
    try {
        var particles = await ParticleModel.find();
        res.json(particles);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/getlastValue/:sensorName', async (req, res) => {
    try {
        var particles =await ParticleModel.findOne({'sensorName':req.params.sensorName.toUpperCase()},{},{ sort: { _id: -1 }, limit: 1});
        res.json(particles);
    } catch (error) {
        res.json({ message: error.message });
    }
})

router.get('/getlastValues', async (req, res) => {
    try {
        var particles =await ParticleModel.aggregate([
            {'$sort': {'timestamp': -1}}, 
            {'$group': {'_id': '$sensorName','data': {'$first': '$$ROOT'}}},
             {'$sort': {'_id': 1}}
            ]).allowDiskUse(true);;
        res.json(particles);
    } catch (error) {
        res.json({ message: error.message });
    }
})


router.post('/add', async (req, res) => {
    console.log("Added new Particle Sensor Value");
    try {
        const savedParticle = await new ParticleModel({
            sensorName: req.body.sensorName,
    pm10_standard:parseFloat( req.body.pm10_standard),
    pm25_standard:parseFloat( req.body.pm25_standard),
    pm100_standard:parseFloat( req.body.pm100_standard),
    pm10_env: parseFloat(req.body.pm10_env),
    pm25_env: parseFloat(req.body.pm25_env),
    pm100_env:parseFloat( req.body.pm100_env),

           
            date: moment().tz("Asia/Colombo").format("YYYY-MM-DD"),
            timestamp: moment().tz("Asia/Colombo").valueOf()
        }).save();

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