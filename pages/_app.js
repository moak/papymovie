import React from 'react';
import { appWithTranslation } from 'next-i18next';

import { SessionProvider } from 'next-auth/react';

import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';

const PappyMovieApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(PappyMovieApp);
