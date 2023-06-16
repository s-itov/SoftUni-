const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [2, 'Title is too short'],
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        minlength: [5, 'Author name is too short'],
        required: [true, 'Author is required']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: [true, 'Image is required']
    },
    review: {
        type: String,
        minlength: [10, 'Review is too short'],
        required: [true, 'Review is required']
    },
    genre: {
        type: String,
        minlength: [3, 'Genre is too short'],
        required: [true, 'Genre is required']
    },
    stars: {
        type: Number,
        required: [true, 'Stars are required'],
        min: [1, 'The star rating should be  between 1 and 5'],
        max: [5, 'The star rating should be  between 1 and 5']
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
