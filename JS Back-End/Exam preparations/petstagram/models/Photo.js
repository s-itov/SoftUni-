const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
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