'use strict;'

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  _id: {
    required: true,
    type: String
  },
}, { timestamps: true, versionKey: false, collection: 'users' });

module.exports = mongoose.model('auth', dataSchema);