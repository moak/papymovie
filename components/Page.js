import React, { useState } from 'react';

import Head from 'next/head';
import NavbarNew from './NavbarNew';

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
        </Head>
      )}
      {/* <Navbar /> */}
      <NavbarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
      {children}
    </>
  );
};

export default withTranslation('common')(Page);
