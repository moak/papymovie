import React, { useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { lightTheme, darkTheme, GlobalStyles } from 'styles/theme';
import { ThemeProvider } from 'styled-components';
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import moment from 'moment';

import 'moment/locale/fr';

moment.locale('fr');
moment.locale('en');

import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';

import { useTheme } from 'styles/theme';

const ThingsYouWatchApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  let themeLocalStorage = null;

  if (typeof window !== 'undefined') {
    themeLocalStorage = localStorage.getItem('theme', theme);
  }

  // const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(themeLocalStorage || 'light');

  const toggleTheme = () => {
    localStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');

    theme == 'light' ? setTheme('dark') : setTheme('light');
  };

  const themeContext = useTheme(theme);

  const finalProps = {
    ...pageProps,
    theme: themeContext,
    toggleTheme,
  };

  usePanelbear(process.env.PANELBEAR_ID);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themeContext}>
        <GlobalStyles />
        <Component {...finalProps} />
      </ThemeProvider>
      <GlobalStyles />
    </SessionProvider>
  );
};

export default appWithTranslation(ThingsYouWatchApp);
