const router = require('express').Router();
const gameManager = require('../managers/gameManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', async (req, res) => {
    const { name, platform } = req.query;

    const games = await gameManager.search(name, platform);

    res.render('home/search', { games });
});

module.exports = router;