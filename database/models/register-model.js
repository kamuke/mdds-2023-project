"use strict";

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  name: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
}, { timestamps: true, versionKey: false, collection: 'users' });

module.exports = mongoose.model('users', dataSchema);