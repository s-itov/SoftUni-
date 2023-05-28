const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/');
});


router.get('/:cubeId/details', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId);

    if (!cube) {
        res.redirect('404');
    }

    res.render('updatedDetailsPage', { cube })
})


router.get('/:cubeId/attach', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId);
    const accessories = await accessoryManager.getAll();

    res.render('attachAccessory', { cube, accessories });
});


module.exports = router;