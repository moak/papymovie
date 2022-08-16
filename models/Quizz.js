const mongoose = require('mongoose');
const { Schema } = mongoose;

import QuizzCategory from './QuizzCategory';

const QuizzSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  writter: {
    type: String,
    required: false,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'QuizzCategory',
  },
  quizz: {
    fr: {
      question: {
        type: String,
        required: true,
      },
      choices: [
        {
          type: String,
          required: true,
        },
      ],
      answer: {
        type: String,
        required: true,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
    en: {
      question: {
        type: String,
        required: false,
      },
      choices: [
        {
          type: String,
          required: false,
        },
      ],
      answer: {
        type: String,
        required: false,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
    es: {
      question: {
        type: String,
        required: false,
      },
      choices: [
        {
          type: String,
          required: false,
        },
      ],
      answer: {
        type: String,
        required: false,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
    de: {
      question: {
        type: String,
        required: false,
      },
      choices: [
        {
          type: String,
          required: false,
        },
      ],
      answer: {
        type: String,
        required: false,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
    it: {
      question: {
        type: String,
        required: false,
      },
      choices: [
        {
          type: String,
          required: false,
        },
      ],
      answer: {
        type: String,
        required: false,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
    nl: {
      question: {
        type: String,
        required: false,
      },
      choices: [
        {
          type: String,
          required: false,
        },
      ],
      answer: {
        type: String,
        required: false,
      },
      anecdote: {
        type: String,
        required: false,
      },
    },
  },

  created_at: { type: Date, default: new Date().toUTCString() },
});

module.exports = mongoose.models?.Quizz || mongoose.model('Quizz', QuizzSchema);
