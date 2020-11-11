import React, { useState, useEffect } from 'react';
import { withTranslation } from 'i18n';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

import Head from 'next/head';
import NavBarNew from './NavBarNew';
import Navbar from './Navbar';

// import { UserProvider, useFetchUser } from 'utils/user';
import { SessionProvider, useGetSession } from 'utils/session';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 60px;
  width: 160px;
  margin: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
const Page = ({
  children,
  title,
  description = 'Stop forgetting what you watch and get inspired!',
  siteName = 'GoldMovies',
  previewImage,
}) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const handleNavbar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const { session, loading } = useGetSession();

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>

          <link rel="icon" href="/favicon.ico" />

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

          <meta name="description" content={description}></meta>

          <meta property="og:image" content={previewImage} key="ogimage" />

          <meta property="og:site_name" content={siteName} key="ogsitename" />
          <meta property="og:title" content={title} key="ogtitle" />
          <meta property="og:description" content={description} key="ogdesc" />
        </Head>
      )}
      <SessionProvider value={{ session, loading }}>
        {loading ? null : (
          <>
            <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
            {/* <Navbar /> */}
            {children}
          </>
        )}
      </SessionProvider>
    </>
  );
};

export default withTranslation('common')(Page);
