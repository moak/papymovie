import React, { useState } from 'react';
import styled from 'styled-components';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';

import NavBarNew from './NavBarNew';

import { i18n, Link, withTranslation } from 'i18n';

const AuthPage = ({ children, title }) => {
  const router = useRouter();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const [session, loading] = useSession();

  const handleNavbar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  // if (typeof window !== "undefined" && loading) return null;

  // if (!session) {
  //   return router.push("/login");
  // }

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      {/* <Navbar /> */}
      <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
      {children}
    </>
  );
};

AuthPage.getInitialProps = async (ctx) => {};

export default withTranslation('common')(AuthPage);
