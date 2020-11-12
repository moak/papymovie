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

    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // Providers.Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials) => {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

    //     // return null;
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       // return Promise.resolve(user);
    //       return user;
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return null;
    //       // return Promise.resolve(null);
    //       // You can also Reject this callback with an Error or with a URL:
    //       // return Promise.reject(new Error('error message')) // Redirect to error page
    //       // return Promise.reject('/path/to/redirect')        // Redirect to a URL
    //     }
    //   },
    // }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
  // session: { jwt: true },
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
    // signIn: async (user, account, profile) => {
    //   console.log({ user, account, profile });
    //   if (user.token) {
    //     console.log('there is token', user.token);
    //   } else {
    //     console.log('there is no token');
    //   }
    //   return true;
    // },

    // redirect: async (url, baseUrl) => {
    //   return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    // },
  },
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
