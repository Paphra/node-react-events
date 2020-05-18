var Category = require('../models/Category');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class CategoryController{

	// get all categories
	static getAllCategories(req, res){
		Category.find({}, (err, categories)=>{
			if(err) return error(err, res);
			return res.status(200).json(categories);
		});
	}

	static getSingleCategory(req, res){
		Category.findById(req.params.id, (err, category)=>{
			if(err) return error(err, res);
			return res.status(200).json(category);
		});
	}

	static deleteCategory(req, res){
		Category.findByIdAndDelete(req.params.id, (err, category)=>{
			if(err) return error(err, res);
			return res.status(200).json(category);
		});
	}

	static saveCategory(req, res){
		let category = new Category(req.body);
		category.save((err, category)=>{
			if(err) return error(err, res);
			return res.status(201).json(category);
		});
	}

	static updateCategory(req, res){
		let category = new Category(req.body);
		category._id = req.params.id;
		Category.findByIdAndUpdate(req.params.id, category, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = CategoryController;
