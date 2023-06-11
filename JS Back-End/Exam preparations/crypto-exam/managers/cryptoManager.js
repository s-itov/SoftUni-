const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.create = (cryptoData, ownerId) => Crypto.create({ ...cryptoData, owner: ownerId});

