import React from 'react';
import App from 'next/app';
import { Provider } from 'next-auth/client';

import 'semantic-ui-css/semantic.min.css';

import 'styles/globals.css';

import { appWithTranslation } from 'i18n';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, namespacesRequired: ['common'] };
};

export default appWithTranslation(MyApp);
