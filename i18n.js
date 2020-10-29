const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  // localeSubpaths,
  localeSubpaths: {
    fr: 'fr',
  },
  localePath: path.resolve('./public/static/locales'),
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  defaultLanguage: 'en',
  otherLanguages: ['fr', 'en'],
  load: 'all',
});
