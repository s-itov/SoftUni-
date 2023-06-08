const router = require('express').Router();

const authManager = require('../managers/authManger');


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
        return res.redirect('/register'); //TODO show message to the user
    }

    const existingUser = await authManager.getUserByUsername(username);

    if (existingUser) {
        return res.redirect('/register'); //TODO show message to the user
    }

    await authManager.register(username, password);

    res.redirect('/login');
});


router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/')
})

module.exports = router;