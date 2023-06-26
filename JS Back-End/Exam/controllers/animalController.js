const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('animal/create');
});

router.post('/create', isAuth, async (req, res) => {
    const userId = req.user._id;
    const animalData = {
        ...req.body,
        owner: userId
    };

    try {
        await animalManager.addAnimal(animalData);

    } catch (error) {
        return res.status(404).render('animal/create', { error: getErrorMessage(error) });
    };

    res.redirect('/animals/dashboard');
});

router.get('/dashboard', async (req, res) => {

    try {
        const animals = await animalManager.getAll();
        res.render('animal/dashboard', { animals });

    } catch (error) {
        return res.status(404).render('animal/dashboard', { error: getErrorMessage(error) });

    };

});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
 
    try {
        const animal = await animalManager.getOne(animalId);
        const isOwner = req.user?._id == animal.owner?._id;
        const hasDonated = animal.donations?.some(x => x._id == req.user?._id);

        res.render('animal/details', { animal, isOwner, hasDonated });

    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });

    };
});


router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalManager.getOne(animalId);
        res.render('animal/edit', { animal });

    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });

    };
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = req.body;

    try {
        await animalManager.update(animalId, animal);

        res.redirect(`/animals/${animalId}/details`);
                
    } catch (error) {
        res.render('animal/edit', { error: getErrorMessage(error), animal });
    };
});


router.get('/:animalId/delete', isAuth, async (req, res) => {

    const animalId = req.params.animalId;

    try {
        await animalManager.delete(animalId);

    } catch (error) {

        return res.status(404).render('404', { error: getErrorMessage(error) });
    }

    res.redirect('/animals/dashboard');

});


router.get('/:animalId/donate', isAuth, async (req, res) => {

    const animalId = req.params.animalId;
    const userId = req.user._id;

    try {
        await animalManager.donate(animalId, userId);
        
    } catch (error) {
        return res.status(404).render('404', { error: getErrorMessage(error) });

    }

    res.redirect(`/animals/${animalId}/details`);

});

module.exports = router;