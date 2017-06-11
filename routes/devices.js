const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../public/js/ensureAuthenticated');

var Door = require('../models/door');
var Bulb = require('../models/bulb');
var Air = require('../models/air');

router.get('/',ensureAuthenticated,function (req,res) {

  Door.find({}).sort({createdAt:-1}).exec(function (err,data) {
    Bulb.find({}).sort({createdAt:-1}).exec(function (err,data2) {
      Air.find({}).sort({createdAt:-1}).exec(function (err,data3) {
          res.render('partials/body/devices/device',{
            name:req.user.name,
            door:data,
            bulb:data2,
            air:data3
          });
      })
    })
  })

})

/*
router.get('/bulb',ensureAuthenticated,function (req,res) {
  res.render('partials/body/devices/bulb',{name:req.user.name});
})
router.get('/air',ensureAuthenticated,function (req,res) {
  res.render('partials/body/devices/air',{name:req.user.name});
})
*/


// Device Recieve
router.post('/door',function (req,res) {
  var now = new Date();
  var hour = now.getHours();
  var min =now.getMinutes();
  var second = now.getSeconds();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var day = now.getDate();

  var date = year+"-"+month+"-"+day;
  var time = ""+hour+":"+min+":"+second;

  var status = req.body.door;

  var newDoor = new Door({
    status:status,
    date: date,
    time: time
  });

  Door.createDoor(newDoor,function (err,door) {
    if(err) throw err;
  })
  io.emit('Door',newDoor);
  res.json(newDoor);
})

router.post('/bulb',function (req,res) {
  var now = new Date();
  var hour = now.getHours();
  var min =now.getMinutes();
  var second = now.getSeconds();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var day = now.getDate();

  var date = year+"-"+month+"-"+day;
  var time = ""+hour+":"+min+":"+second;

  var status = req.body.bulb;

  var newBulb = new Bulb({
    status:status,
    date: date,
    time: time
  });

  Bulb.createBulb(newBulb,function (err,bulb) {
    if(err) throw err;
  })
  io.emit('Bulb',newBulb);
  res.json(newBulb);
})

router.post('/ir',function (req,res) {
  var now = new Date();
  var hour = now.getHours();
  var min =now.getMinutes();
  var second = now.getSeconds();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var day = now.getDate();

  var date = year+"-"+month+"-"+day;
  var time = ""+hour+":"+min+":"+second;

  var status = req.body.ir;

  var newAir = new Air({
    status:status,
    date: date,
    time: time
  });

  Air.createAir(newAir,function (err,air) {
    if(err) throw err;
  })
  io.emit('Air',newAir);
  res.json(newAir);
})

module.exports = router;
