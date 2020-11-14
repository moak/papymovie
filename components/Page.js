import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import usePrevious from 'hooks/usePrevious';

import NavBarNew from 'components/NavBarNew';

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
}) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();
  const previousSession = usePrevious(session);

  const handleNavbar = useCallback(() => {
    setIsNavBarOpen(!isNavBarOpen);
  }, [isNavBarOpen]);

  // useEffect(() => {
  //   if (!previousSession && session) {
  //     router.push('/movies');
  //   }

  //   if (previousSession && !session) {
  //     router.push('/');
  //   }
  // }, [session]);

  return (
    <>
      {title && (
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
      )}
      {loading ? (
        <LoaderContainer>
          <Loader active inline="centered" size="large" />
        </LoaderContainer>
      ) : (
        <>
          <NavBarNew navbarState={isNavBarOpen} handleNavbar={handleNavbar} />
          {children}
        </>
      )}
    </>
  );
};

export default Page;
