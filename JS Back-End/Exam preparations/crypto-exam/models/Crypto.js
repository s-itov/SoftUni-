const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Invalid name'],
        required: true
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Invalid URL'],
        required: true
    },
    price: {
        type: Number,
        min: [0, 'The price should be a positive number'],
        required: true
    },
    description: {
        type: String,
        min: [10, 'The description must be at least 10 characters long'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method'
        },
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;