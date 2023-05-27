const mongoose = require('mongoose');

const Footballer = require('./models/Footballer');

async function connectDb() {
    await mongoose.connect('mongodb://127.0.0.1:27017/footballers')

    console.log('Database connected successfully'); 

    // await Footballer.create({
    //     name: 'Lionel Messi',
    //     age: 28,
    //     nationality: 'Argentina',
    //     position: 'ST',
    //     club: 'Paris Saint Germain',
    //     foot: 'Left'
    // })

    const footballer = await Footballer.findOne();

    console.log(footballer);

}

connectDb();