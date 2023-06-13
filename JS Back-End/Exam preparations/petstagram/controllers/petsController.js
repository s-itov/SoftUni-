const router = require('express').Router();
const petsManager = require('../managers/petsManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {

    try {
        const pets = await petsManager.getAll().populate('owner');
        res.render('pets/catalog', { pets });
    } catch (error) {
        return res.status(404).render('pets/catalog', { error: getErrorMessage(error)}); 
    }
});


router.get('/:petId/details', async (req, res) => {


    try {
        const pet = await petsManager.getOne(req.params.petId).populate('owner');
        const isOwner = pet?.owner._id == req.user?._id;
        res.render('pets/details', { pet, isOwner });
        
    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error)}); 

    }

});

router.get('/:petId/delete', async (req, res) => {

    try {
        await petsManager.deletePhoto(req.params.petId);
    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error)}); 
    }

    res.redirect('/pets/catalog');

});

router.get('/create', isAuth, (req, res) => {
    res.render('pets/create');
});

router.post('/create', isAuth, async  (req, res) => {
    
    const photoData = req.body;

    try {
       await petsManager.addPhoto(photoData, req.user._id);
    } 
    catch (error) {
       return res.status(404).render('pets/create', { error: getErrorMessage(error)}); 
    }

    res.redirect('/pets/catalog');

});




module.exports = router;