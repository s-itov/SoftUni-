const router = require('express').Router();
const petsManager = require('../managers/petsManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    try {
        const pets = await petsManager.getAll().populate('owner');
        res.render('pets/catalog', { pets });

    } catch (error) {
        return res.status(404).render('pets/catalog', { error: getErrorMessage(error) });
    }
});


router.get('/:petId/details', async (req, res) => {

    try {
        const pet = await petsManager.getOne(req.params.petId).populate('owner commentList.userId');

        const isOwner = pet?.owner._id == req.user?._id;

        const populatedComments = pet.commentList.map(({ userId, comment }) => ({
            username: userId.username,
            comment
        }));

        res.render('pets/details', { pet, isOwner, comments: populatedComments });

    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error) });
    }

});

router.get('/:petId/edit', isAuth, async (req, res) => {

    try {
        const pet = await petsManager.getOne(req.params.petId);

        res.render('pets/edit', { pet });

    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error) });
    }

});

router.post('/:petId/edit', isAuth, async (req, res) => {

    const photoData = req.body;

    try {
        await petsManager.update(req.params.petId, photoData);

        res.redirect(`/pets/${req.params.petId}/details`);

    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error) });
    }

});

router.get('/:petId/delete', async (req, res) => {

    try {
        await petsManager.deletePhoto(req.params.petId);

    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error) });
    }

    res.redirect('/pets/catalog');

});

router.post('/:petId/comment', async (req, res) => {

    const { comment } = req.body;

    try {
        await petsManager.comment(req.params.petId, req.user._id, comment);
        res.redirect(`/pets/${req.params.petId}/details`);
    } catch (error) {
        return res.status(404).render('pets/details', { error: getErrorMessage(error) });
    }


});

router.get('/create', isAuth, (req, res) => {
    res.render('pets/create');
});

router.post('/create', isAuth, async (req, res) => {

    const photoData = req.body;

    try {
        await petsManager.addPhoto(photoData, req.user._id);
    }
    catch (error) {
        return res.status(404).render('pets/create', { error: getErrorMessage(error) });
    }

    res.redirect('/pets/catalog');

});

module.exports = router;