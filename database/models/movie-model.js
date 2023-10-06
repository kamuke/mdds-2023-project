"use strict";

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        length: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
}, { timestamps: true, versionKey: false, collection: 'Movies'  });

module.exports = mongoose.model('movies', dataSchema);