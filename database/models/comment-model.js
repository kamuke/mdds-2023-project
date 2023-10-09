"use strict";

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  rating: {
    required: true,
    type: Number
  },
  comment: {
    required: true,
    type: String
  },
  senderEmail: {
    required: true,
    type: String
  },
}, { timestamps: true, versionKey: false, collection: 'Comments' });

module.exports = mongoose.model('comments', dataSchema);