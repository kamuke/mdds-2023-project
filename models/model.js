const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    message: {
        required: true,
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);