const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({
    name: String,
    footballers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Footballer'
    }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;