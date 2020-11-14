import React, { useEffect } from 'react';
import App from 'next/app';
import { Provider } from 'next-auth/client';
import { useRouter } from 'next/router';

import 'semantic-ui-css/semantic.min.css';

import 'styles/globals.css';

import * as gtag from 'utils/gtag';

import { appWithTranslation } from 'i18n';

const PappyMovieApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    if (process.env.NODE_ENV === 'production') {
      router.events.on('routeChangeComplete', handleRouteChange);
    }
    return () => {
      if (process.env.NODE_ENV === 'production') {
        router.events.off('routeChangeComplete', handleRouteChange);
      }
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

PappyMovieApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, namespacesRequired: ['common'] };
};

export default appWithTranslation(PappyMovieApp);
