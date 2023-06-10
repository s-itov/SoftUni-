const mongoose = require('mongoose');
const project = 'crypto'; // Change the database name
const uri = `mongodb://127.0.0.1:27017/${project}`;

async function initDatabase() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);

    console.log('Database connected...');
}

module.exports = initDatabase;