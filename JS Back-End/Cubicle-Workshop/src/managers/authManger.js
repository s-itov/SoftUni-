const User = require('../models/User');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, passowrd) => {

    const user = await this.getUserByUsername(username);

    const isValid = await !user.validatePassword(passowrd);
    
    if(!user || !isValid) {
        throw 'Username or password don\'t match';
    }

    return user;

}