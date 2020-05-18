var Subscriber = require('../models/Subscriber');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Somthing went wrong!',
	});
}

class SubscriberController {
	// get all subscribers
	static getAllSubscribers(req, res){
		Subscriber.find({}, (err, subscribers)=>{
			if(err) return error(err, res); 
			return res.status(200).json(subscribers);
		});
	}

	// get single subscriber
	static getSingleSubscriber(req, res){
		Subscriber.findById(req.params.id, (err, subscriber)=>{
			if(err) return error(err, res);
			return res.status(200).json(subscriber)
		});
	}

	// Save a subscriber
	static saveSubscriber(req, res){
		let subscriber = new Subscriber(req.body);
		Subscriber.findOne({'email': subscriber.email}, (err, found)=>{
			if(err) return error(err, res);
			if(found){
				return res.status(200).json(found)
			}
			subscriber.save((err, saved)=>{
				if(err) return error(err, res);
				return res.status(201).json(saved);
			});
		});	
	}
	
	static deleteSubscriber(req, res){
		Subscriber.findByIdAndDelete(req.params.id, (err, subscriber)=>{
			if(err) return error(err, res);
			return res.status(200).json(subscriber);
		});
	}

	// Update subscriber
	static updateSubscriber(req, res){
		let subscriber = new Subscriber(req.body);
		subscriber._id = req.params.id;
		Subscriber.findByIdAndUpdate(
			req.params.id, subscriber, ( err, updated ) => {
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = SubscriberController;
