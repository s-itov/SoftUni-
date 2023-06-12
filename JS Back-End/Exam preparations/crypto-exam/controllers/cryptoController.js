const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoManager = require('../managers/cryptoManager');
const cryptoUtils = require('../utils/cryptoUtils');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    try {
        const crypto = await cryptoManager.getAll();
        res.render('crypto/catalog', { crypto });
    } catch (error) {
        return res.status(404).render('crypto/catalog', { error: getErrorMessage(error) });
    }
});

router.get('/search', async (req, res) => {
    const { name, paymentMethod } = req.query;
 
    const crypto = await cryptoManager.search(name, paymentMethod);
    
    res.render('crypto/search', { crypto });
})


router.get('/:cryptoId/details', async (req, res) => {

    try {
        const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
        const isOwner = crypto?.owner == req.user?._id;
        const isBuyer = crypto.buyers?.some(id => id == req.user?._id);

        res.render('crypto/details', { crypto, isOwner, isBuyer });

    } catch (error) {
        return res.status(404).render('crypto/details', { error: getErrorMessage(error) });
    }

})

router.get('/:cryptoId/delete', isAuth, async (req, res) => {

    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
    const isOwner = crypto?.owner == req.user?._id;

    try {
        await cryptoManager.deleteById(isOwner, req.params.cryptoId);

    } catch (error) {

        return res.status(404).render('404', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog');

})

router.get('/:cryptoId/buy', isAuth, async (req, res) => {

    try {
        await cryptoManager.buy(req.user._id, req.params.cryptoId);

    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });

    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {

    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();

    const paymentMethods = cryptoUtils.generatePaymentMethods(crypto.paymentMethod);

    res.render('crypto/edit', { crypto, paymentMethods });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {

    const cryptoData = req.body;

    try {
        await cryptoManager.edit(req.params.cryptoId, cryptoData);

    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });

    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

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

    res.redirect('/crypto/catalog');
});

module.exports = router;