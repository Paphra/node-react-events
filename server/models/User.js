var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},

	is_super: { type: Boolean, default: false },

	username: { type: String, min: 5, max: 15, required: true },
	password: { type: String, required: true },
	
	email: { type: String, min: 5, max: 50 },
	phone: { type: String },
	image: { type: String },

	partner: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
	
	lastActive: {type: Date},
	createdOn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
