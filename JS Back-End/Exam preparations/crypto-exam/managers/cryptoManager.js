const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.deleteById = (isOwner, cryptoId) => {


    if (!isOwner) {
        throw new Error('Error deleting crypto');
    }

    
   return Crypto.findByIdAndDelete(cryptoId);
}

exports.create = (cryptoData, ownerId) => Crypto.create({ ...cryptoData, owner: ownerId});

