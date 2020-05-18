var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
	fullName: String,
	email: { type: String, unique: true },
	status: { type: String, enum: [ 'Active', 'Inactive' ], default: 'Active' },
	joinedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
