const Book = require('../models/Book');

exports.createReview = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find().lean();

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.update = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.wishToRead = (bookId, userId) => Book.findByIdAndUpdate(bookId, {$push: { wishingList: userId }});

