const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizzCategorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  lang: {
    fr: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
    en: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
    es: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
    de: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
    it: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
    nl: {
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports =
  mongoose.models?.QuizzCategory || mongoose.model('QuizzCategory', QuizzCategorySchema);
