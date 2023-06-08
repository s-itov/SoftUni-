const jwt = require('../lib/jsonwebtoken');

const { SECRET } = require('../config/config');

const User = require('../models/User');


exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, passowrd) => {

    const user = await this.getUserByUsername(username);

    const isValid = await user.validatePassword(passowrd);
    
    if(!user || !isValid) {
        throw 'Username or password don\'t match';
    }

    const payload = {
        _id: user._id,
        username: user.username
    }
    const token =  await jwt.sign(payload, SECRET, {expiresIn: '2h'});

    return token;

}