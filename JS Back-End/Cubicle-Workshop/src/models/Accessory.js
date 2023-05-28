const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: [120, 'You excceeded the max length of the 120 characters']
    },
    cubes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
    }   
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;