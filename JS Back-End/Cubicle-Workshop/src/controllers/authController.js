const router = require('express').Router();


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    const {username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(404).end() //todo show message to the user
    }

    

});

module.exports = router;