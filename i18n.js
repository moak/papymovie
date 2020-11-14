const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  localeSubpaths,
  // localeSubpaths: {
  //   fr: 'fr',
  // },
  // localeSubpaths,
  browserLanguageDetection: false,
  // serverLanguageDetection: false,
  defaultLanguage: 'en',
  otherLanguages: ['fr', 'en'],
  localePath: path.resolve('./public/static/locales'),
  // load: 'all',
});
