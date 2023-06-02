const jwt = require('../lib/jsonwebtoken');

exports.authentication = async (req, res, next) => {
    const token = req.cookies.auth;

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, 'somesecret')

            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true;
        } catch (error) {
            console.log(error.message);
            
            res.clearCookie('auth');

            res.redirect('/404');
        }
    } 

    next();
} 

exports.isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated){
        return res.redirect('/login');
    }

    next();
}