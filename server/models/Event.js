var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, slug: 'title'},
	openSlots: {type: Number, default: 0},
	partners: [{type: Schema.Types.ObjectId, ref: 'Partner'}],
	
	startDate: { type: Date, required: true },
	endDate: {type: Date, required: true},
	
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	
	tags: [String],
	image: String,
	desc: { type: String, required: false },
	location: {type: String, required: true},

	createdOn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
