import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import NavBarNew from './NavBarNew';

import { withTranslation } from '../i18n';

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
        </Head>
      )}
      {/* <Navbar /> */}
      <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
      {children}
    </>
  );
};

export default withTranslation('common')(Page);
