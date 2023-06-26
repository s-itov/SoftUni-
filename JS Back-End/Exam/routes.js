const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const animalController = require('./controllers/animalController');

router.use(homeController);
router.use(authController);
router.use('/animals', animalController);
router.all('*', (req, res) => {
    res.render('404');
})

module.exports = router;