const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

const gameManager = require('../managers/gameManager');
const platformUtis = require('../utils/platformUtils');

router.get('/catalog', async (req, res) => {
    try {
        const games = await gameManager.getAll();
        res.render('game/catalog', { games });

    } catch (error) {
        return res.status(404).render('game/catalog', { error: getErrorMessage(error) });
    }
});


router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getOne(gameId);
        const isOwner = req.user?._id == game.owner._id;
        const isBuyer = game.boughtBy.some(x => x._id == req.user?._id);

        res.render('game/details', { game, isOwner, isBuyer }) //TODO : Make buyer function.
    } catch (error) {

        return res.status(404).render('game/catalog', { error: getErrorMessage(error) });

    }

});

router.get('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getOne(gameId);
        const platforms = platformUtis.generatePlatform(game.platform);
        res.render('game/edit', { game, platforms });
        
    } catch (error) {
        return res.status(404).render('game/catalog', { error: getErrorMessage(error) });
    }

});

router.post('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    await gameManager.update(gameId, gameData);

    res.redirect('/games/catalog');

});

router.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameManager.remove(gameId);
    } catch (error) {
        return res.status(404).render('game/catalog', { error: getErrorMessage(error) });
    }

    res.redirect('/games/catalog');

});


router.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    const userId =  req.user._id;

    await gameManager.buyGame(gameId, userId);

    res.redirect(`/games/${gameId}/details`)

})


router.get('/create', isAuth, (req, res) => {

    res.render('game/create');
})

router.post('/create', isAuth, async (req, res) => {
    const userId = req.user._id;
    const gameData = req.body;

    try {

        await gameManager.addGame(gameData, userId);

    } catch (error) {

        return res.status(404).render('game/create', { error: getErrorMessage(error) });

    }

    res.redirect('/games/catalog');

});




module.exports = router;