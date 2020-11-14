const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  fr: 'fr',
  en: 'en',
};

console.log({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    THEMOVIEDB_API_KEY: process.env.THEMOVIEDB_API_KEY,
    MONGO_URI: process.env.MONGO_URI,

    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,

    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
});

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    THEMOVIEDB_API_KEY: process.env.THEMOVIEDB_API_KEY,
    MONGO_URI: process.env.MONGO_URI,

    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,

    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
};
