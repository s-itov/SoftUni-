const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: [10, 'The email shoud contain at least 10 characters'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;