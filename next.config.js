const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    API_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'https://goldmovies.vercel.app',
    GITHUB_ID: 'Iv1.89eb014e156ae93b',
    GITHUB_SECRET: '0bd2f7d2bc627458093e523e96f63b81553b0309',
    MONGO_URI:
      'mongodb+srv://seyaa:P1kRkq42BREDrgwB@cluster0.yxsov.mongodb.net/<dbname>?retryWrites=true&w=majority',
  },
};
