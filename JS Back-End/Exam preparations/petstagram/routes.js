const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const petsController = require('./controllers/petsController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use(authController);
router.use('/user', userController);
router.use('/pets', petsController);
router.all('*', (req, res) => {
    res.render('404');
})

module.exports = router;