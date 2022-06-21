import NextAuth from 'next-auth';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from 'utils/mongoNew';

import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: async (session) => {
      session.session.userId = session.user.id;

      return session;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.SECRET,
});
