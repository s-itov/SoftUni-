const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const cubeUtils = require('../utils/cubeUtils');


const jwt = require('../lib/jsonwebtoken');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('cube/create');
});


router.post('/create', isAuthenticated, async (req, res) => {

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
    const cube =  await cubeManager.getOne(req.params.cubeId).populate('accessories').lean();

    if (!cube) {
        res.redirect('404');
    }

    res.render('cube/details', { cube })
})


router.get('/:cubeId/attach', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.showRemainingAccessories(cube).lean();

    res.render('accessory/attach', { cube, accessories });
});


router.post('/:cubeId/attach', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId);
    const accessoryID = req.body.accessory;

    cube.accessories.push(accessoryID);

    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube =  await cubeManager.getOne(req.params.cubeId).lean();

    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    res.render('cube/edit', { cube, difficultyLevels });
})

module.exports = router;