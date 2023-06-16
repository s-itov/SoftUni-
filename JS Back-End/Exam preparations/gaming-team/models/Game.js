const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [4, 'The name is too short'],
        require: true,
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price shoud be a positive number'],
        require: true
    },
    description: {
        type: String,
        minlength: [10, 'The description is too short'],
        require: true
    },
    genre: {
        type: String,
        minlength: [2, 'The genre is too short'],
        require: true
    },
    platform: {
        type: String,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: 'Invalid platform'
        },
        required: true
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;