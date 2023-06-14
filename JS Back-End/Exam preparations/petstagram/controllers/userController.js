const router = require('express').Router();
const petsManager = require('../managers/petsManager');

router.get('/profile', async (req, res) => {

  const userPictures = await petsManager
    .getAll({ 'owner.username': req.user.username })
    .populate('owner')

  res.render('profile', {
    username: req.user.username,
    email: req.user.email,
    count: userPictures.length,
    pictures: userPictures
  });

});

module.exports = router;