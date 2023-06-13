const Photo = require('../models/Photo');

exports.addPhoto = (photoData, userId) => Photo.create({...photoData, owner: userId});

exports.getAll = () => Photo.find({}).lean();

exports.getOne = (petId) => Photo.findById(petId).lean(); 

exports.deletePhoto = (petId) => Photo.findByIdAndDelete(petId);