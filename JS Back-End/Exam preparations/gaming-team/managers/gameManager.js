const Game = require('../models/Game');


exports.getAll = () => Game.find({}).lean();

exports.addGame = (gameData, userId) => Game.create({...gameData, owner: userId});