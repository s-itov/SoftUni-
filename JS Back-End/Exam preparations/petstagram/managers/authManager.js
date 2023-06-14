const SECRET = process.env.BCRYPT_SECRET;

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');


exports.findByUsername = (username) => User.findOne({username});

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    // TODO: Validate password via requirements
    
    const existingUser = await this.findByUsername(email);

    if (existingUser) {
        throw new Error('User with the same username already exists');      
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
 
    await User.create({username, email, password: hashedPassword});
}


exports.login = async (username, password) => {
    //If User exists
    const user = await this.findByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    //If Password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    }

    //Generate token
    const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
    
    return token;
};


