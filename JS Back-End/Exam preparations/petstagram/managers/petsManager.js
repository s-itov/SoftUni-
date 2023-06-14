const Photo = require('../models/Photo');

exports.addPhoto = (photoData, userId) => Photo.create({...photoData, owner: userId});

exports.getAll = () => Photo.find({}).lean();

exports.getOne = (petId) => Photo.findById(petId).lean(); 

exports.deletePhoto = (petId) => Photo.findByIdAndDelete(petId);

exports.comment = (petId, userId, comment) => Photo.findByIdAndUpdate(petId, { $push: { commentList: { userId: userId, comment: comment } } },
                                                                    { new: true });

exports.update = (petId, photoData) => Photo.findByIdAndUpdate(petId, {...photoData})

exports.getAllUserPhotos = (username) => Photo.find({ 'owner.username': username });

