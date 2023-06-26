const router = require('express').Router();
const authManager = require('../managers/authManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }

})

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        await authManager.register(email, password, repeatPassword);

        const token = await authManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/'); 

    } catch (error) {
        res.status(404).render('auth/register', { error: getErrorMessage(error) }); 
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;