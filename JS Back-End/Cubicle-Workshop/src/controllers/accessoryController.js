const router = require('express').Router();
const accessoryManager = require('../managers/accessoryManager');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {

    const {
        name,
        description,
        imageUrl,
    } = req.body;

    accessoryManager.create({
        name,
        description,
        imageUrl,
    });

    res.redirect('/');
});



module.exports = router;