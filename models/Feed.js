const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  created_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = mongoose.models.Feed || mongoose.model('Feed', FeedSchema);
