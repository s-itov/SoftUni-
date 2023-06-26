const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: [2, 'Name is too short'],
        required: [true, 'Name is required']
    },
    years: {
        type: Number,
        min: [1, 'The years should be  between 1 and 100'],
        max: [100, 'The years should be  between 1 and 100'],
        required: [true, 'Years are required']
    },
    kind: {
        type: String,
        minlength: [3, 'Kind is too short'],
        required: [true, 'Kind is required']
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: [true, 'Image is required']
    },
    need: {
        type: String,
        minlength: [3, 'The need of the animal should be  between 3 and 20 characters'],
        maxlength: [20, 'The need of the animal should be  between 3 and 20 characters'],
        required: [true, 'Need is required']
    },
    location: {
        type: String,
        minlength: [5, 'The location should be between 5 and 15 characters'],
        maxlength: [15, 'The location should be between 5 and 15 characters'],
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        minlength: [5, 'The description should be between 5 and 50 characters'],
        maxlength: [50, 'The description should be between 5 and 50 characters'],
        required: [true, 'Description is required']
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;