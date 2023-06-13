const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('pets/catalog');
})

module.exports = router;