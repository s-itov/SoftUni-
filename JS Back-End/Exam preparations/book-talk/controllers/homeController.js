const router = require('express').Router();
const bookManager = require('../managers/bookManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {

    try {
        const books = await bookManager.getAll().populate('owner');
        const ownerBooks = books.filter(x => x.owner.username === req.user.username);
        res.render('home/profile', {
            email: req.user.email,
            books: ownerBooks
          });
    } catch (error) {
        return res.status(404).render('home/profile', { error: getErrorMessage(error)});
    }
 
  });

module.exports = router;