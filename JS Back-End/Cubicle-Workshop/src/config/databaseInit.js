const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/cubicle'

async function initDatabase() {
    await mongoose.connect(uri);

    console.log('Database connected...');
}

module.exports = initDatabase;