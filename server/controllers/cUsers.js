var User = require('../models/User');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class UserController{

	// get all users
	static getAllUsers(req, res){
		User.find( {} )
			.populate( 'partner' )
			.exec( (err, users)=>{
				if(err) return error(err, res);
				return res.status(200).json(users);
			})
	}

	static getSingleUser(req, res){
		User.findById( req.params.id )
			.populate( 'partner' )
			.exec( (err, user)=>{
				if(err) return error(err, res);
				return res.status(200).json(user);
			})
	}

	static deleteUser(req, res){
		User.findByIdAndDelete(req.params.id, (err, user)=>{
			if(err) return error(err, res);
			return res.status(200).json(user);
		});
	}

	static saveUser(req, res){
		let user = new User(req.body);
		user.save((err, user)=>{
			if(err) return error(err, res);
			return res.status(201).json(user);
		});
	}

	static updateUser(req, res){
		let user = new User(req.body);
		user._id = req.params.id;
		User.findByIdAndUpdate(req.params.id, user, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = UserController;
