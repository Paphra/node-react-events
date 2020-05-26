var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	description: String,
	
	amount: Number,
	slots: Number,
	discount: Number,
	ticket_no: String,
	
	createdOn: {type: Date, default: Date.now},
	updatedOn: {type: Date, default: Date.now},
	
	trackingId: String,
	reference: {type: String, max: 50, required: true},
	status: {type: String, enum: ['PENDING', 'COMPLETED',], default: 'PENDING'},
	cleared: {type: Boolean, default: false},

});

module.exports = mongoose.model('Book', BookSchema);
