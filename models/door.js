const mongoose = require('mongoose');

// Sensor Schema
var DoorSchema = mongoose.Schema({
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

var Door = module.exports = mongoose.model('Door', DoorSchema);

module.exports.createDoor = function (newDoor,callback) {
  newDoor.save(callback);
}
