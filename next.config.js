const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    NEXTAUTH_URL: 'goldmovies.vercel.app',
    GITHUB_ID: 'Iv1.0dde917e3f3812e9',
    GITHUB_SECRET: 'd2e37f1cffff1111c3a8e53eca03a8427e6a1d22',
    MONGO_URI:
      'mongodb+srv://seyaa:P1kRkq42BREDrgwB@cluster0.yxsov.mongodb.net/<dbname>?retryWrites=true&w=majority',
  },
};
