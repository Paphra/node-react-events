var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, slug: 'title'},
	openSlots: {type: Number, default: 0},
	partners: [{type: Schema.Types.ObjectId, ref: 'Partner'}],
	
	startDate: { type: String, required: true },
	startTime: { type: String, required: true },
	endDate: { type: String, required: true },
	endTime: { type: String, required: true },
	
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	price: Number,
	discount: Number,
	currency: { type: String, enum: [ 'UGX', 'USD' ], default: 'UGX' },
	
	image: String,
	description: String,
	location: { type: String, required: true },

	status: { type: String, enum: [ 'Draft', 'Published' ], default: 'Draft' },
	createdOn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Event', EventSchema);
