import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import NavBarNew from './NavBarNew';

import { withTranslation } from 'i18n';

const Page = ({ children, title }) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const handleNavbar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

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
      {/* <Navbar /> */}
      <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
      {children}
    </>
  );
};

export default withTranslation('common')(Page);
