var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new Schema({
	name: { type: String, default: "Ultimate Sports Events"},
	
	// contacts
	email: String ,
	phone: String,
	address: String,

	// socials
	facebook: String,
	twitter: String,
	whatsapp: String,
	website: String,

	// location [Specific] to be used for google maps
	longtiude: String,
	latitude: String,

	description: String,

	updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', AboutSchema);
