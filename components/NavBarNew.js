import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Button, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import { i18n, withTranslation } from '../i18n';

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 1;
  font-size: 14px;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  height: 100%;

  &:hover {
    text-decoration: none;
  }

  &.active {
    text-decoration: none;
  }
`;

const MenuText = styled.div`
  font-size: 14px;
  margin-left: 4px;
`;
const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const LinkButtonContainer = styled.div`
  margin-right: 48px;
  height: 70px;
`;

const SearchContainer = styled.div`
  width: 500px;
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavBarNew = (props) => {
  const [session, loading] = useSession();

  const barAnimation = useSpring({
    // from: { transform: 'translate3d(0, -10rem, 0)' },
    // transform: 'translate3d(0, 0, 0)',
  });
  const router = useRouter();

  const [search, setSearch] = useState(router.query.search || '');

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    router.push(`/search?search=${search}`);
  };

  const linkAnimation = useSpring({
    // from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    // to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    // delay: 800,
    // config: config.wobbly,
  });

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <SearchContainer>
            <form onSubmit={submitSearch}>
              <Input
                onChange={handleChangeSearch}
                fluid
                icon="search"
                placeholder="Search..."
                value={search || ''}
              />
            </form>
          </SearchContainer>
          <NavLinks style={linkAnimation}>
            <Link href="/my_movies">My movies</Link>
            <Link href="/discover">Discover</Link>
            <a>
              <span
                onClick={(e) => {
                  e.preventDefault;

                  i18n.changeLanguage('fr');
                }}
              >
                FR
              </span>{' '}
              |{' '}
              <span
                onClick={(e) => {
                  e.preventDefault;

                  i18n.changeLanguage('en');
                }}
              >
                EN
              </span>
            </a>
            {session ? (
              <Button style={{ marginRight: 16 }} circular onClick={signOut}>
                Signout
              </Button>
            ) : (
              <>
                <Button style={{ marginRight: 16 }} circular href="/login">
                  Login
                </Button>

                <Button
                  circular
                  primary
                  style={{
                    marginRight: '1.1rem',
                  }}
                  href="/register"
                  content={'register'}
                />
              </>
            )}
          </NavLinks>

          <BurgerWrapper>
            <BurgerMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
    </>
  );
};

export default NavBarNew;