const mongoose = require('mongoose');
const { Schema } = mongoose;

import User from './User';
import Movie from './Movie';

const CommentSchema = new Schema(
  {
    deleted: Boolean,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  },
  {
    usePushEach: true,
  },
);

CommentSchema.pre('save', function (next) {
  this.updated_at = new Date().toUTCString();
  next();
});

module.exports = mongoose.models?.Comment || mongoose.model('Comment', CommentSchema);
