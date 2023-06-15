const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [4, 'The name of the game too short'],
        require: true,
    },
    imageUrl: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    genre: {
        type: String,
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