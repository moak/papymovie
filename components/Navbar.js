import React, { useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { useFetchUser } from 'utils/userAuth0';

const StyledHeader = styled.div`
  background-color: #dddbe8;
  .ant-menu {
    width: 100%;
    background-color: #dddbe8;
    a {
      height: 64px;
    }
  }
`;

const Navbar = () => {
  const { user, loading } = useFetchUser();

  return (
    <StyledHeader>
      <Link href="/">
        <a>Home</a>
      </Link>
      {user && !loading
        ? [
            <>
              <Link href="/api/logout">
                <a>Logout</a>
              </Link>
            </>,
            <>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </>,
          ]
        : null}
      {!user && !loading ? (
        <>
          <Link href="/api/login">
            <a>Login</a>
          </Link>
        </>
      ) : null}
    </StyledHeader>
  );
};

export default Navbar;
