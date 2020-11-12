import React, { useState, useCallback } from 'react';
import { withTranslation } from 'i18n';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { useSession } from 'next-auth/client';
import Head from 'next/head';

import NavBarNew from 'components/NavBarNew';

const Container = styled.div`
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
}) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [session, loading] = useSession();

  const handleNavbar = useCallback(() => {
    setIsNavBarOpen(!isNavBarOpen);
  }, [isNavBarOpen]);

  return (
    <>
      {title && (
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <meta property="og:site_name" content="PapyMovie" key="ogsitename" />

          {typeof window !== 'undefined' && (
            <meta property="og:url" content={window.location.href} key="ogurl" />
          )}

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
      )}
      {loading ? (
        <Container>
          <Loader active inline="centered" size="large" />
        </Container>
      ) : (
        <>
          <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
          {children}
        </>
      )}
    </>
  );
};

export default withTranslation('common')(Page);
