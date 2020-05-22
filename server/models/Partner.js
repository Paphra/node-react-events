var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
	
	name: { type: String, required: true },
	description: String,
	email: String,
	phone: String,
	website: String,
	address: String,
	image: String,

	status: { type: String, enum: [ "Active", "Inactive" ], default: 'Active' },
	
	createdOn: { type: Date, default: Date.now },

} );

module.exports = mongoose.model('Partner', PartnerSchema);
