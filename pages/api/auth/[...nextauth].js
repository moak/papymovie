import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,

  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      console.log('session.id', session.id);
      return session;
      // return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
