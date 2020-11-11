const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    updated_at: Date,
    created_at: Date,
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
  },
  {
    usePushEach: true,
  },
);

CommentSchema.pre('save', function (next) {
  this.updated_at = new Date().toUTCString();
  next();
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
