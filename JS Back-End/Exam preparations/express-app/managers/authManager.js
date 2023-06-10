const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET }  = require('../config/config');


exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    // TODO: Validate password via requirements
    
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
        throw new Error('User with the same username already exists');      
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
 
    await User.create({username, email, password: hashedPassword});
}


exports.login = async (email, password) => {
    //If User exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    //If Password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username
    }

    //Generate token
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
    
    return token;
};


