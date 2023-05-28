const Cube = require('../models/Cube');

exports.getAll = async (search, from, to) => {

    let result = await Cube.find().lean();

    //TODO: Use db filtration instead of in memory filtering
    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
}

exports.getOne = async (cubeId) => await Cube.findById(cubeId).populate('accessories').lean();

exports.getOneAsDocument = async (cubeId) => await Cube.findById(cubeId);


exports.create = async (cubeData) => {

    let cube = new Cube({...cubeData});

    await cube.save();
}