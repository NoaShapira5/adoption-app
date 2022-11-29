const mongoose = require('mongoose')

const listingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender']
    },
    race: {
        type: String,
        requird: [true, 'Please add a race']
    },
    age: {
        type: Number,
        required: [true, 'Please add an age']
    },
    desc: {
        type: String
    },
    images: {
        type: [String],
        requird: [true, 'Please add images']
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Listing', listingSchema)