const router = require('express').Router();
const bookManager = require('../managers/bookManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/create', isAuth, (req, res) => {

    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    const userId = req.user._id;

    const bookData = {
        ...req.body,
        owner: userId
    };

    try {
        await bookManager.createReview(bookData);

    } catch (error) {
        return res.status(404).render('book/create', { error: getErrorMessage(error) });
    }

    res.redirect('/books/catalog');

});


router.get('/catalog', async (req, res) => {

    
    try {
        const books = await bookManager.getAll();
        res.render('book/catalog', { books });

    } catch (error) {
        return res.status(404).render('book/catalog', { error: getErrorMessage(error) });

    }

});


router.get('/:bookId/details', async (req, res) => {

    const bookId = req.params.bookId;

    try {
        const book = await bookManager.getOne(bookId);
        const isOwner = req.user?._id == book.owner._id;
        const isInWishlist = book.wishingList.some(x => x._id == req.user?._id);

        res.render('book/details', { book, isOwner, isInWishlist });

    } catch (error) {
        return res.status(404).render('book/details', { error: getErrorMessage(error) });

    }

});

router.get('/:bookId/edit', isAuth, async (req, res) => {

    const bookId = req.params.bookId;

    try {
        const book = await bookManager.getOne(bookId);

        res.render('book/edit', { book });

    } catch (error) {
        return res.status(404).render('book/edit', { error: getErrorMessage(error) });

    }

});


router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    try {
         await bookManager.update(bookId, bookData);

    } catch (error) {
        return res.status(404).render('book/edit', { error: getErrorMessage(error) });
    }

    res.redirect(`/books/${bookId}/details`);
});


router.get('/:bookId/delete', isAuth, async (req, res) => {

    const bookId = req.params.bookId;

    try {
         await bookManager.delete(bookId);

    } catch (error) {
        return res.status(404).render('book/edit', { error: getErrorMessage(error) });

    }

    res.redirect(`/books/catalog`);

});


router.get('/:bookId/wish', isAuth, async (req, res) => {

    const bookId = req.params.bookId;
    const userId = req.user._id;

    try {
         await bookManager.wishToRead(bookId, userId);

    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });
    }

    res.redirect(`/books/${bookId}/details`);

});

module.exports = router;