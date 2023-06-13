const router = require('express').Router();
const authManager = require('../managers/authManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authManager.login(username, password);

        console.log(token);
        res.cookie('auth', token);
        res.redirect('/'); // Check where to redirect!
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }

})

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    console.log(req.body);

    try {
        await authManager.register(username, email, password, repeatPassword);

        //This register function is automatically login when successful register.
        const token = await authManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/'); // Check where to redirect!

    } catch (error) {
        res.status(404).render('auth/register', { error: getErrorMessage(error) }); // Check where to redirect!
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;