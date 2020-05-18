var Book = require('../models/Book');

function error(err, res){
	return res.status(500).json({
		error: err.message,
		message: 'Something went wrong!',
	})
}

class BookController{

	// get all books
	static getAllBooks(req, res){
		Book.find({}, (err, books)=>{
			if(err) return error(err, res);
			return res.status(200).json(books);
		});
	}

	static getSingleBook(req, res){
		Book.findById(req.params.id, (err, book)=>{
			if(err) return error(err, res);
			return res.status(200).json(book);
		});
	}

	static deleteBook(req, res){
		Book.findByIdAndDelete(req.params.id, (err, book)=>{
			if(err) return error(err, res);
			return res.status(200).json(book);
		});
	}

	static saveBook(req, res){
		let book = new Book(req.body);
		book.save((err, book)=>{
			if(err) return error(err, res);
			return res.status(201).json(book);
		});
	}

	static updateBook(req, res){
		let book = new Book(req.body);
		book._id = req.params.id;
		Book.findByIdAndUpdate(req.params.id, book, (err, updated)=>{
			if(err) return error(err, res);
			return res.status(200).json(updated);
		});
	}
}

module.exports = BookController;
