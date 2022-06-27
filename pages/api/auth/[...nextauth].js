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
    // async redirect({ url, baseUrl }) {
    //   console.log({ url, baseUrl });
    //   // Allows relative callback URLs
    //   if (url.startsWith('/')) {
    //     return `${baseUrl}${url}`;
    //   }
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) {
    //     return `${baseUrl}/movies`;
    //   }
    //   return baseUrl;
    // },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: '/signin',
  },

  secret: process.env.SECRET,
});
