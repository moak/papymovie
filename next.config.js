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
    THEMOVIEDB_API_KEY: process.env.THEMOVIEDB_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,

    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,

    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SECRET: process.env.SECRET,
  },
};
