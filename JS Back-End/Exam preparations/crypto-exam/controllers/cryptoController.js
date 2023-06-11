const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoManager = require('../managers/cryptoManager');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    try {
        const crypto = await cryptoManager.getAll().lean();
        res.render('crypto/catalog', { crypto });
    } catch (error) {
        return res.status(404).render('crypto/catalog', { error: getErrorMessage(error) });
    }
});

router.get('/:cryptoId/details', async (req, res) => {

    try {
        const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
        const isOwner = crypto?.owner == req.user?._id;
        res.render('crypto/details', { crypto, isOwner });

    } catch (error) {
        return res.status(404).render('crypto/details', { error: getErrorMessage(error) });
    }

})

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoManager.create(cryptoData, req.user._id);
    } catch (error) {
        return res.status(404).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
});

module.exports = router;