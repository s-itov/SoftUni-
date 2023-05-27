const mongoose = require('mongoose');

const Footballer = require('./models/Footballer');
const Team = require('./models/Team');

async function connectDb() {
    await mongoose.connect('mongodb://127.0.0.1:27017/footballers')

    console.log('Database connected successfully');

    // await Footballer.create({
    //     name: 'Lionel Messi',
    //     age: 28,
    //     nationality: 'Argentina',
    //     position: 'ST',
    //     foot: 'Left'
    // })

    // Footballer.findByIdAndUpdate('6471bc8a642cd6a9e49f5709', {team: '6471bd9f7d655604a6cb0fba'})
    //     .then(() => {
    //         console.log('Footballer updated succesfully');
    //     })
    //     .catch((err) => {
    //         console.log('Erorr updating Footballer: ', err);
    //     } )

    // await Team.findByIdAndUpdate('6471bd9f7d655604a6cb0fba', { $push: { footballers: '6471bc8a642cd6a9e49f5709' } });

    // const Footballers = await Footballer.find();
    // const Teams = await Team.find();

    Team.findById('6471bd9f7d655604a6cb0fba')
        .populate('footballers')
        .exec()
        .then((team) => {
            console.log('Footballers in the team:', team.footballers);
        })
        .catch((error) => {
            console.log('Error retrieving team details:', error);
        });



}

connectDb();