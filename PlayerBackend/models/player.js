const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    touchdowns: {
        type: Number
    },
    passYards: {
        type: Number
    },
    rushYards: {
        type: Number
    },
    recYards: {
        type: Number
    },
    fgMade: {
        type: Number
    }
})

module.exports = mongoose.model("PlayerStats", PlayerSchema, "PlayerStats");