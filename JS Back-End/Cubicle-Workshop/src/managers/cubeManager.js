const Cube = require('../models/Cube');

exports.getAll =  (search, from, to) => {

    let result = Cube.find().lean();

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

exports.getOne =  (cubeId) =>  Cube.findById(cubeId);

exports.getOneAsDocument =  (cubeId) =>  Cube.findById(cubeId);

exports.create =  (cubeData) => Cube.create(cubeData);

exports.update = (cubeId, cube) => Cube.findByIdAndUpdate(cubeId, cube, { runValidators : true });

exports.delete = (cube) => Cube.deleteOne(cube);