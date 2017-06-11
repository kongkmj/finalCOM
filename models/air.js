const mongoose = require('mongoose');

// Sensor Schema
var AirSchema = mongoose.Schema({
	status:{
		type:String
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

var Air = module.exports = mongoose.model('Air', AirSchema);

module.exports.createAir = function (newAir,callback) {
  newAir.save(callback);
}
