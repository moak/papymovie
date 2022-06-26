import React, { useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { lightTheme, darkTheme, GlobalStyles } from 'styles/theme';
import { ThemeProvider } from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';

import { useTheme } from 'styles/theme';

const PappyMovieApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    console.log('toggleTheme');
    theme == 'light' ? setTheme('dark') : setTheme('light');
  };
  const themeContext = useTheme(theme);

  const finalProps = {
    ...pageProps,
    theme: themeContext,
    toggleTheme,
  };

  console.log('theme', theme);
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

export default appWithTranslation(PappyMovieApp);
