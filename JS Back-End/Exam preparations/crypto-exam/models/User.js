const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [5, 'Invalid username'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        minlength: [10, 'Invalid email'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: [4, 'Password must be at least 4 characters'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;