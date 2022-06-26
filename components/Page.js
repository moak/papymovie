import React, { useState, useCallback } from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Head from 'next/head';
import { useTheme } from 'styles/theme';

import Header from './Header';

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`;

const Page = ({
  children,
  title = 'PapyMovie',
  description = 'Stop forgetting what you watch and get inspired!',
  previewImage,
  url = '',
  isLoading = false,
  toggleTheme,
  theme,
}) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const handleNavbar = useCallback(
    (value) => {
      if (typeof value === 'string') {
        setIsNavBarOpen(value);
      } else {
        setIsNavBarOpen(!isNavBarOpen);
      }
    },
    [isNavBarOpen],
  );

  return (
    <>
      {title && !isLoading ? (
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <meta property="og:site_name" content="PapyMovie" key="ogsitename" />
          <meta property="fb:app_id" content={process.env.FACEBOOK_CLIENT_ID} key="fbappid" />

          <meta property="og:url" content={`${process.env.NEXTAUTH_URL}${url}`} key="ogurl" />

          {title && (
            <>
              <title>{title}</title>
              <meta property="og:title" content={title} key="ogtitle" />
            </>
          )}

          {previewImage && <meta property="og:image" content={previewImage} key="ogimage" />}

          {description && (
            <>
              <meta name="description" content={description}></meta>
              <meta property="og:description" content={description} key="ogdesc" />
            </>
          )}
        </Head>
      ) : null}

      {isLoading ? (
        <>
          <Header
            toggleTheme={toggleTheme}
            theme={theme}
            navbarState={isNavBarOpen}
            handleNavbar={handleNavbar}
          />
          <LoaderContainer>
            <Loader active inline="centered" size="large" />
          </LoaderContainer>
        </>
      ) : (
        <>
          <Header
            toggleTheme={toggleTheme}
            theme={theme}
            navbarState={isNavBarOpen}
            handleNavbar={handleNavbar}
          />
          {/* {children} */}

          {React.cloneElement(children, { theme })}
        </>
      )}
    </>
  );
};

export default Page;
