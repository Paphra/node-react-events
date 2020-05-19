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
		About.findOne({}, (err, about)=>{
			if ( err ) return error( err, res ); 
			if ( about ) {
				return res.status(200).json(about);	
			} else {
				About.create( {} )
					.then( ( about ) => {
					return res.status(200).json(about)
				}).catch(reason=>{return error(reason)})
			}
			
		});
	}

	// Save a about
	static saveAbout(req, res){
		let about = new About(req.body);
		About.findOne( {}, ( err, found ) => {
			if ( err ) return error( err, res )
			if ( found ) {
				about._id = found._id
				console.log( about )
				found.updateOne( about, ( err, updated ) => {
					if ( err ) return error( err, res )	
					return res.status(200).json(updated)
				})
			} else {
				About.create( about )
					.then( ( about ) => {
					return res.status(200).json(about)
				}).catch(reason=>{return error(reason)})
			}
		})		
	}

}

module.exports = AboutController;
