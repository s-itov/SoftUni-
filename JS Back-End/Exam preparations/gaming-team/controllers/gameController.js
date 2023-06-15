const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

const gameManager = require('../managers/gameManager');

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

router.get('/catalog', async (req, res) => {
try {
    
    const games = await gameManager.getAll();

    res.render('game/catalog', { games });

} catch (error) {

    return res.status(404).render('game/catalog', { error: getErrorMessage(error) });

}

})



module.exports = router;