const { i18n } = require('./next-i18next.config');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,

    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    THEMOVIEDB_API_KEY: process.env.THEMOVIEDB_API_KEY,

    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,

    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SECRET: process.env.SECRET,
  },
};
