const Accessory = require('../models/Accessory');


exports.create = async (accessoryData) => {

    let accessory = new Accessory({...accessoryData});

    await accessory.save();

}

exports.getAll = async () => await Accessory.find().lean();
