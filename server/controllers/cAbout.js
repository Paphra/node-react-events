var About = require('../models/About');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Somthing went wrong!',
	});
}

class AboutController {
	
	// get all abouts
	static getAbout(req, res){
		About.findOne({}, (err, abouts)=>{
			if(err) return error(err, res); 
			return res.status(200).json(abouts);
		});
	}

	// Save a about
	static saveAbout(req, res){
		let about = new About(req.body);
		if ( req.body._id ) {
			About.findByIdAndUpdate(
				req.body._id, about, ( err, updated ) => {
				if(err) return error(err, res);
				return res.status(200).json(updated);
			});
		}
		about.save((err, saved)=>{
			if(err) return error(err, res);
			return res.status(201).json(saved);
		});
		
	}

}

module.exports = AboutController;
