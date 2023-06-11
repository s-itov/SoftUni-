const mongoose = require('mongoose');
const host = process.env.HOST;
const port = process.env.PORT;
const project = process.env.PROJECT;

const uri = `mongodb://${host}:${port}/${project}`;

async function initDatabase() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);

    console.log('Database connected...');
}

module.exports = initDatabase;