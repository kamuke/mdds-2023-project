"use strict";

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  senderEmail: {
    required: true,
    type: String,
    unique: true
  },
  userId: {
    required: true,
    type: String
  },
  messageId: {
    required: true,
    type: String
  }
}, { timestamps: true, versionKey: false, collection: 'Users' });

module.exports = mongoose.model('deleteMessage', dataSchema);