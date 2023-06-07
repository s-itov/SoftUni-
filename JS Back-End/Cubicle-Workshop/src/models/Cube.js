const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: [120, 'You excceeded the max length of the 120 characters']
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    difficultyLevel: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 6,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;