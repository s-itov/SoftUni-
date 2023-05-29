const Accessory = require('../models/Accessory');

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = () =>  Accessory.find();

exports.showRemainingAccessories = (cube) =>  Accessory.find({ _id: {$nin: cube.accessories}});
