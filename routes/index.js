const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../public/js/ensureAuthenticated');


var Sensor = require('../models/sensor');
var Door = require('../models/door');
var Bulb = require('../models/bulb');
var Air = require('../models/air');


// Get Hompage
router.get('/dashboard',ensureAuthenticated,function (req,res) {
var fire;
var Rdata;
var door;
var bulb;
var air;
      Sensor.findOne({}).sort({createdAt:-1}).exec(function (err,data) {
        Sensor.find({}).limit(12).sort({createdAt:-1}).exec(function (err,data2) {
          Door.findOne({}).sort({createdAt:-1}).exec(function (err,doordata) {
            Bulb.findOne({}).sort({crfeatdAt:-1}).exec(function (err,bulbdata) {
              Air.findOne({}).sort({createdAt:-1}).exec(function (err,airdata) {

                Rdata = data2.reverse();
                if(data.fire =='1'){
                  data.fire = '화재'
                }else if(data.fire=='0'){
                  data.fire ='정상'
                }

                if(doordata.status =="OPEN"){
                  door = true;
                }else{
                  door= false;
                }
                if(bulbdata.status =="ON"){
                  bulb= true;
                }else{
                  bulb=false;
                }
                if(airdata.status =="ON"){
                  air=true;
                }else{
                  air=false;
                }

                res.render('partials/body/dashboard',{
                  name:req.user.name,
                  temp:data.temp,
                  humi:data.humi,
                  gas:data.gas,
                  lumi:data.light,
                  fire:data.fire,
                  Rdata:Rdata,
                  door:doordata.status,
                  doorIcon:door,
                  bulb:bulbdata.status,
                  bulbIcon:bulb,
                  air:airdata.status,
                  airIcon:air
                });

              })
            })
          })
        })
      })
});

module.exports = router;
