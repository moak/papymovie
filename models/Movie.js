const mongoose = require('mongoose');
const { Schema } = mongoose;

import User from './User';

const MovieSchema = new Schema({
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
  },
  description: {
    type: String,
    required: false,
    maxlength: [300, 'Description cannot be more than 300 characters'],
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  created_at: { type: Date, default: new Date().toUTCString() },
  updated_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
