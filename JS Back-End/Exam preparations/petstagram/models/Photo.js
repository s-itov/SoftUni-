const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Invalid petname'],
        required: true,
    },
    age: {
        type: Number,
        minlength: [1, 'Invalid age'],
        maxlength: [100, 'Invalid age'],
        required: true,
    },
    description: {
        type: String,
        minlength: [5, 'The description should be between 5 and 50 characters'],
        maxlength: [50, 'The description should be between 5 and 50 characters'],
        required: true,
    },
    location: {
        type: String,
        minlength: [5, 'The location should be between 5 and 50 characters'],
        maxlength: [50, 'The location should be between 5 and 50 characters'],
        required: true,
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: true
    },
    commentList: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;