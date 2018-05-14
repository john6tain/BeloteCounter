const mongoose = require('mongoose');

let teamSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    score: [{ type: mongoose.Schema.Types.Number, default: 0 }]
});

let Team = mongoose.model('Team', teamSchema);

module.exports = Team;