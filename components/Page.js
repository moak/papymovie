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
const Page = ({ children, title }) => {
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
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
            className="next-head"
          />
          <script
            data-ad-client="ca-pub-8592736460427517"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
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
