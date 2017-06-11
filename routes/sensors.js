const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../public/js/ensureAuthenticated');


var Sensor = require('../models/sensor');

router.get('/temp',ensureAuthenticated,function (req,res) {
var Rdata = new Array();
  Sensor.find({}).limit(20).sort({createdAt:-1}).exec(function (err,data) {

  for( var i = 19 ; i>=0;i--){
    Rdata[i] = data[19-i];
  }
    res.render('partials/body/sensors/temp',
    {
      name:req.user.name,
      layout:'layoutChart',
      data: data,
      Rdata: Rdata
    });
  })
})

router.get('/humi',ensureAuthenticated,function (req,res) {
  var Rdata = new Array();
  Sensor.find({}).limit(20).sort({createdAt:-1}).exec(function (err,data) {
    for( var i = 19 ; i>=0;i--){
      Rdata[i] = data[19-i];
    }
    res.render('partials/body/sensors/humi',
    {
      name:req.user.name,
      layout:'layoutChart',
      data: data,
      Rdata:Rdata
    });
  })
})

router.get('/gas',ensureAuthenticated,function (req,res) {
  var Rdata = new Array();
  Sensor.find({}).limit(20).sort({createdAt:-1}).exec(function (err,data) {
    for( var i = 19 ; i>=0;i--){
      Rdata[i] = data[19-i];
    }
    res.render('partials/body/sensors/gas',
    {
      name:req.user.name,
      layout:'layoutChart',
      data: data,
      Rdata:Rdata
    });
  })
})

router.get('/lumi',ensureAuthenticated,function (req,res) {
  var Rdata = new Array();
  Sensor.find({}).limit(20).sort({createdAt:-1}).exec(function (err,data) {
    for( var i = 19 ; i>=0;i--){
      Rdata[i] = data[19-i];
    }
    res.render('partials/body/sensors/lumi',
    {
      name:req.user.name,
      layout:'layoutChart',
      data: data,
      Rdata:Rdata
    });
  })
})

/*
router.get('/fire',ensureAuthenticated,function (req,res) {
  res.render('partials/body/sensors/fire',{name:req.user.name});
})
*/

// Sensor Recieve
router.post('/',function (req,res) {
  var now = new Date();
  var hour = now.getHours();
  var min =now.getMinutes();
  var second = now.getSeconds();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var day = now.getDate();

  var date = year+"-"+month+"-"+day;
  var time = ""+hour+":"+min+":"+second;

  var temp = req.body.temp;
  var humi = req.body.humi;
  var light= req.body.light;
  var gas = req.body.gas;
  var fire = req.body.fire;

  // Data recieve Validation
  if(temp===undefined) console.log('Temp is not sended!');
  if(humi===undefined) console.log('Humi is not sended!');
  if(light===undefined)console.log('Light is not sended!');
  if(gas===undefined) console.log('Gas is not sended!');
  if(fire===undefined) console.log('Fire is not sended!');

  var newSensor = new Sensor({
    temp: temp,
    humi: humi,
    light: light,
    gas: gas,
    fire: fire,
    time:time,
    date:date
  });

  /** Validation
    .............
  **/

  Sensor.createSensor(newSensor,function (err,sensor) {
    if(err) throw err;
    //console.log(sensor);
  })
  io.emit('Sensor',newSensor);
  res.json(newSensor);
})

module.exports = router;
