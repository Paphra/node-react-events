var Partner = require('../models/Partner');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class PartnerController{

	// get all partners
	static getAllPartners(req, res){
		Partner.find({}, (err, partners)=>{
			if(err) return error(err, res);
			return res.status(200).json(partners);
		});
	}

	static getSinglePartner(req, res){
		Partner.findById(req.params.id, (err, partner)=>{
			if(err) return error(err, res);
			return res.status(200).json(partner);
		});
	}

	static deletePartner(req, res){
		Partner.findByIdAndDelete(req.params.id, (err, partner)=>{
			if(err) return error(err, res);
			return res.status(200).json(partner);
		});
	}

	static savePartner(req, res){
		let partner = new Partner(req.body);
		partner.save((err, partner)=>{
			if(err) return error(err, res);
			return res.status(201).json(partner);
		});
	}

	static updatePartner(req, res){
		let partner = new Partner(req.body);
		partner._id = req.params.id;
		Partner.findByIdAndUpdate(req.params.id, partner, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = PartnerController;
