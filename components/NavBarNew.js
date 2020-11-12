import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Button, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { signOut, signIn } from 'next-auth/client';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import { i18n, withTranslation } from 'i18n';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

const NavBarContainer = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 3;
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
    font-weight: 500;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 800px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 1100px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: ${(p) => (p.isMobile ? 350 : 350)}px;
  margin: auto 0;
`;

const NavBarNew = (props) => {
  const [session, loading] = useSession();

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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
      <NavBarContainer style={barAnimation}>
        <FlexContainer>
          {!isMobile && <Brand isConnected={!!session} />}
          <SearchContainer isMobile={isMobile}>
            <form onSubmit={submitSearch}>
              <Input
                action={
                  isMobile
                    ? null
                    : {
                        icon: 'search',
                        onClick: submitSearch,
                      }
                }
                style={{ fontSize: 16 }}
                onChange={handleChangeSearch}
                fluid
                placeholder="Search a movie..."
                value={search || ''}
                // size=""
              />
            </form>
          </SearchContainer>

          <NavLinks style={linkAnimation}>
            {!isMobile && !isTablet && (
              <>
                <Link href="/movies">Movies</Link>
                <Link href="/community">Community</Link>
                <Link href="/users">Users</Link>
                {session && <Link href={`/users/${session && session.id}`}>My profile</Link>}
              </>
            )}
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

            {!isMobile && !isTablet && (
              <>
                {session ? (
                  <Button
                    style={{ marginRight: 16 }}
                    color="red"
                    circular
                    size="small"
                    onClick={signOut}
                  >
                    Signout
                  </Button>
                ) : (
                  <>
                    <Button style={{ marginRight: 16 }} circular primary onClick={signIn}>
                      Connect
                    </Button>
                  </>
                )}
              </>
            )}
          </NavLinks>

          <BurgerWrapper>
            <BurgerMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
          </BurgerWrapper>
        </FlexContainer>
      </NavBarContainer>
      <CollapseMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
    </>
  );
};

export default NavBarNew;
