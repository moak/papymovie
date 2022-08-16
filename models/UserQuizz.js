const mongoose = require('mongoose');

const { Schema } = mongoose;

import Quizz from './Quizz';
import User from './User';

const UserQuizzSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    quizz: {
      type: Schema.Types.ObjectId,
      ref: 'Quizz',
    },
    isSuccess: { type: Boolean, required: true },
    created_at: { type: Date, default: new Date().toUTCString() },
  },
  {
    usePushEach: true,
  },
);

module.exports = mongoose.models?.UserQuizz || mongoose.model('UserQuizz', UserQuizzSchema);
