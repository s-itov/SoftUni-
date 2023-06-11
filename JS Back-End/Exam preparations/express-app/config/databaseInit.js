const mongoose = require('mongoose');
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const PROJECT = process.env.PROJECT;

const uri = `mongodb://${HOST}:${PORT}/${PROJECT}`;

async function initDatabase() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);

    console.log('Database connected...');
}

module.exports = initDatabase;