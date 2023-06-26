const Animal = require('../models/Animal');

exports.addAnimal = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find().lean();

exports.getOne = (animalId) => Animal.findById(animalId).lean();

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.update = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, {$push: {donations: userId}});

exports.search = async (location) => {

    let animals = await this.getAll();

    if (location) {
        animals = animals.filter(animal => animal.location.toLowerCase().includes(location.toLowerCase()));
    };

    return animals;
}