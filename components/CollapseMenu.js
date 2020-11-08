/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { useGetSession } from 'utils/session';

import { useSpring, animated } from 'react-spring';

const CollapseMenu = (props) => {
  const { session } = useGetSession();

  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          zIndex: 3,
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <NavLinks>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>

          {session ? (
            <>
              <li>
                <Link href={`/users/${session && session.id}`}>My profile</Link>
              </li>
              <li>
                <a onClick={signOut}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <hr />
              <li>
                <Link href="/login">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #2d3436;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a,
  div {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;
