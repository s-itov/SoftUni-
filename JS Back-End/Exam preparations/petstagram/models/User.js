const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [2, 'Username too short'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        minlength: [10, 'Email too short'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: [4, 'Password too short'],
        required: [true, 'Password is required']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;