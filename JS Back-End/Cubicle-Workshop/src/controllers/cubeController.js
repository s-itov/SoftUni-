const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    await cubeManager.create({
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

    res.render('details', { cube })
})


router.get('/:cubeId/attach', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId);
    const accessories = await accessoryManager.getAll(cube);

    res.render('attachAccessory', { cube, accessories });
});


router.post('/:cubeId/attach', async (req, res) => {
    const cube =  await cubeManager.getOneAsDocument(req.params.cubeId);
    const accessoryID = req.body.accessory;

    cube.accessories.push(accessoryID);

    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
});

module.exports = router;