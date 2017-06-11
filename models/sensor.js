const mongoose = require('mongoose');

// Sensor Schema
var SensorSchema = mongoose.Schema({
	temp: {
		type: String
	},
	humi: {
		type: String
	},
	light: {
		type: String
	},
	fire: {
		type: String
	},
  gas: {
		type: String
	},
	date:{
		type:String
	},
	time:{
		type: String
	},
	createdAt:{
		type:Date,default:Date.now
	}

});

var Sensor = module.exports = mongoose.model('Sensor', SensorSchema);

module.exports.createSensor = function (newSensor,callback) {
  newSensor.save(callback);
}
