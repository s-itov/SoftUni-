const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.search = async (search, paymentMethod) => {
    let crypto = await this.getAll();

    if (search) {
        crypto = crypto.filter(crypto => crypto.name.toLowerCase().includes(search.toLowerCase()));
        console.log(crypto);
    }

    if (paymentMethod) {
        crypto = crypto.filter(x => x.paymentMethod == paymentMethod);
    }

    return crypto; 
};

exports.deleteById = (isOwner, cryptoId) => {
    if (!isOwner) {
        throw new Error('Error deleting crypto');
    }

    return Crypto.findByIdAndDelete(cryptoId);
}

exports.create = (cryptoData, ownerId) => Crypto.create({ ...cryptoData, owner: ownerId});

exports.buy = (userId, cryptoId) =>  Crypto.findByIdAndUpdate(cryptoId, {$push: { buyers: userId} });

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);


