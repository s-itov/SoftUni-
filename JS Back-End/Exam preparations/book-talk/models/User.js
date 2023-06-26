const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: [10, 'The email shoud be at least 10 characters'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        minlength: [4, 'The username shoud be at least 4 characters'],
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;