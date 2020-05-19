var Event = require('../models/Event');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class EventController{

	// get all events
	static getAllEvents(req, res){
		Event.find( {} )
			.populate( 'partners' )
			.populate( 'category' )
			.exec((err, events)=>{
				if(err) return error(err, res);
				return res.status(200).json(events);
			})
	}

	static getSingleEvent(req, res){
		Event.findById( req.params.id )
			.populate( 'partners' )
			.populate( 'category' )
			.exec((err, event)=>{
				if(err) return error(err, res);
				return res.status(200).json(event);
			})
	}

	static deleteEvent(req, res){
		Event.findByIdAndDelete(req.params.id, (err, event)=>{
			if(err) return error(err, res);
			return res.status(200).json(event);
		});
	}

	static saveEvent(req, res){
		let event = new Event(req.body);
		event.save((err, event)=>{
			if(err) return error(err, res);
			return res.status(201).json(event);
		});
	}

	static updateEvent(req, res){
		let event = new Event(req.body);
		event._id = req.params.id;
		Event.findByIdAndUpdate(req.params.id, event, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = EventController;
