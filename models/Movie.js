const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  themoviedbId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    maxlength: [40, 'Title cannot be more than 40 characters'],
  },
  description: {
    type: String,
    required: false,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  image: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  rating: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
