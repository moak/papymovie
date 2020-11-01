const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = mongoose.models.Feed || mongoose.model('Feed', FeedSchema);
