const jwt = require('../lib/jsonwebtoken');

const User = require('../models/User');


exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, passowrd) => {

    const user = await this.getUserByUsername(username);

    const isValid = await user.validatePassword(passowrd);
    
    if(!user || !isValid) {
        throw 'Username or password don\'t match';
    }

    const payload = { username: user.username }
    const token =  await jwt.sign(payload, 'somesecret', {expiresIn: '2h'});

    return token;

}