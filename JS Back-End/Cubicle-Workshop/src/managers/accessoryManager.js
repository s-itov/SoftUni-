const Accessory = require('../models/Accessory');

exports.create = async (accessoryData) => {

    let accessory = new Accessory({...accessoryData});

    await accessory.save();

}

exports.getAll = async (cube) => await Accessory.find({ _id: {$nin: cube.accessories}}).lean();
