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
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;