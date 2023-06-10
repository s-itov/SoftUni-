const router = require('express').Router();

const authManager = require('../managers/authManger');

const { extractErrorMessages } = require('../utils/errorHelpers');

let errorMessages = [];

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {
        const token = await authManager.login(username, password);

        res.cookie('auth', token, { httpOnly: true })
    }
    catch (err){
        console.log(err);
    }
    
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        errorMessages.push('The two passwords don\'t match');
        res.status(404).render('auth/register', { errorMessages })
        errorMessages = [];
        return 
    }

    const existingUser = await authManager.getUserByUsername(username);

    if (existingUser) {
        errorMessages.push('There is an user with that name already registered');
        res.status(404).render('auth/register', { errorMessages })
        errorMessages = [];
        return 
     }
    
    try {
        await authManager.register(username, password);
    
        try {
            const token = await authManager.login(username, password);
    
            res.cookie('auth', token, { httpOnly: true })
        }
        catch (err){
            console.log(err);
        }
        
        res.redirect('/');
        
    } catch (error) {
        errorMessages = extractErrorMessages(error)
        res.status(404).render('auth/register', { errorMessages })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
})

module.exports = router;