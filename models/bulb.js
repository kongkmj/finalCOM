const mongoose = require('mongoose');

// Sensor Schema
var BulbSchema = mongoose.Schema({
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

var Bulb = module.exports = mongoose.model('Bulb', BulbSchema);

module.exports.createBulb = function (newBulb,callback) {
  newBulb.save(callback);
}
