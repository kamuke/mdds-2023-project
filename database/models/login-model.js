'use strict;'

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('login', dataSchema);