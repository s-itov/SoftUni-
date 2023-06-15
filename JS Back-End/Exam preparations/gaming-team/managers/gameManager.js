const Game = require('../models/Game');

exports.getOne = (gameId) => Game.findById(gameId).lean();

exports.getAll = () => Game.find({}).lean();

exports.addGame = (gameData, userId) => Game.create({...gameData, owner: userId});

exports.update = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.remove = (gameId) => Game.findByIdAndRemove(gameId);

exports.buyGame = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });

exports.search = async (name, platform) => {

    let games = await this.getAll();

    if (name) {
        games = games.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (platform) {
        games = games.filter(x=> x.platform === platform);
    }

    return games;

}