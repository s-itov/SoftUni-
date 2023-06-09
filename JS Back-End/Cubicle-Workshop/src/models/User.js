const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        match: /^[A-Za-z0-9]+$/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


userSchema.pre('save', async function() {
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    } catch (error) {
        throw error;
    }
});

userSchema.method('validatePassword',  function(password) {
    return bcrypt.compare(password, this.password);
})

const User = mongoose.model('User', userSchema);

module.exports = User;