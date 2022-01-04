const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 4
    }

})

const Movie = mongoose.model('movie', movieSchema)
module.exports = Movie