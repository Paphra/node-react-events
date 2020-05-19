var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},

	admin: { type: Boolean, default: false },

	username: { type: String, required: true },
	password: { type: String, required: true },
	
	email: { type: String, required: true },
	phone: String,
	image: String,

	partner: { type: Schema.Types.ObjectId, ref: 'Partner', required: false },
	status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
	lastActive: Date,
	createdOn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
