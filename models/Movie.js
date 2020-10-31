const mongoose = require('mongoose');
const { Schema } = mongoose;

import User from './User';

const MovieSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  themoviedbId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    // maxlength: [40, 'Title cannot be more than 40 characters'],
  },
  description: {
    type: String,
    required: false,
    maxlength: [300, 'Description cannot be more than 200 characters'],
  },
  image: {
    type: String,
    required: true,
    // maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  rating: {
    type: Number,
    required: false,
  },
  created_at: { type: Date, default: new Date().toUTCString() },

  updated_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
