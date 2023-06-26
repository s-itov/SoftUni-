const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req, res) => {

    try {

        let animals = await animalManager.getAll();

        if (animals) {

            animals = animals.slice(-3).reverse();
        }

        res.render('home', { animals });
        
    } catch (error) {
        
        return res.status(404).render('404', { error: getErrorMessage(error) });

    }
 
});


router.get('/search', async (req, res) => {
    const { location } = req.query;

    try {
        const animals = await animalManager.search(location);
        res.render('home/search', { animals });
        
    } catch (error) {
        return res.status(404).render('home/search', { error: getErrorMessage(error) });

    }

});



module.exports = router;