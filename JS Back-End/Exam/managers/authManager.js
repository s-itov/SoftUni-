const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const SECRET = process.env.BCRYPT_SECRET;


exports.findByEmail = (email) => User.findOne({email});

exports.register = async (email, password, repeatPassword) => {
    
    if (password === '') {
        throw new Error('Password is required');
    }

    if (password.length < 4) {
        throw new Error('Password is too short');
    }
    
    
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    // TODO: Validate password via requirements
    
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
        throw new Error('User with the same email already exists');      
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
 
    await User.create({email, password: hashedPassword});
}


exports.login = async (email, password) => {

    if (password === '') {
        throw new Error('Password is required');
    }

    if (password.length < 4) {
        throw new Error('Password is too short');
    }
    
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
        email: user.email,
    }

    //Generate token
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
    
    return token;
};

