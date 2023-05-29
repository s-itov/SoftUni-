const Accessory = require('../models/Accessory');

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = (cube) =>  Accessory.find({ _id: {$nin: cube.accessories}});
