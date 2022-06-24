/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { useSpring, animated } from 'react-spring';
import { Button, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { signOut, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import SearchBar from './SearchBar';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

// eslint-disable-next-line no-unused-vars
const HeaderContainer = styled(({ isTransparent, ...props }) => (
  <animated.nav
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  />
))`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${(p) => (p.isTransparent ? 'transparent' : '#2d3436')};
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

const Header = (props) => {
  const { t } = useTranslation('common');

  const { data: session } = useSession();

  const [isTransparent, setIsTransparent] = useState(true);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const router = useRouter();

  const [search, setSearch] = useState(router.query.search || '');

  const languages = [
    { lang: 'fr', display: 'FR' },
    { lang: 'en', display: 'EN' },
  ];

  const handleChangeSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const submitSearch = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      router.push(`/search?search=${search}`);
    },
    [search],
  );

  const logout = useCallback(() => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }, []);

  const connect = useCallback(() => {
    signIn(null, { callbackUrl: `${window.location.origin}/community` });
  }, []);

  const linkAnimation = useSpring({
    // from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    // to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    // delay: 800,
    // config: config.wobbly,
  });

  const barAnimation = useSpring({
    // from: { transform: 'translate3d(0, -10rem, 0)' },
    // transform: 'translate3d(0, 0, 0)',
    // from: { opacity: 0 },
    // to: { opacity: !isTransparent ? 1 : 0.7 },
    // config: { tension: 220, friction: 120 },
    // duration: 2000,
    // transform: 'translate3d(0, 0, 0)',
  });

  const handleScroll = () => {
    if (window.scrollY <= 70) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleLocaleChange = (data) => {
    router.replace(router.asPath, router.asPath, { locale: data });
  };

  return (
    <>
      <HeaderContainer
        style={barAnimation}
        isTransparent={router.pathname === '/' && isTransparent}
      >
        <FlexContainer>
          {isMobile ? null : <Brand isConnected={!!session} />}

          <form onSubmit={submitSearch}>
            <SearchBar
              isMobile={isMobile}
              onDelete={() => {
                router.push(`/movies`);
              }}
              placeholder={t('header.search')}
              onChange={handleChangeSearch}
              value={search || ''}
            />
          </form>

          {!isMobile && !isTablet && (
            <NavLinks style={{ ...linkAnimation, width: 550 }}>
              {!isMobile && !isTablet && (
                <>
                  <Link href="/movies">{t('header.movies')}</Link>
                  <Link href="/community">{t('header.community')}</Link>
                  <Link href="/users">{t('header.users')}</Link>
                  {session && (
                    <Link href={`/users/${session && session?.user?.id}`}>
                      {t('header.my_profile')}
                    </Link>
                  )}
                </>
              )}
            </NavLinks>
          )}

          {!isMobile && !isTablet && (
            <>
              <NavLinks style={{ ...linkAnimation }}>
                {languages.map((language, index) => (
                  <React.Fragment key={language.display}>
                    {index > 0 && (
                      <span
                        style={{
                          margin: '0 6px',
                          color: '#ffffff',
                        }}
                      >
                        |
                      </span>
                    )}

                    <span // eslint-disable-line jsx-a11y/click-events-have-key-events
                      onClick={() => handleLocaleChange(language.lang)}
                      style={{
                        cursor: 'pointer',
                        color: router.locale === language.lang ? '#ffffff' : 'grey',
                        marginRight: index + 1 === languages.length ? 20 : 0,
                      }}
                    >
                      {language.display}
                    </span>
                  </React.Fragment>
                ))}

                {session ? (
                  <Button
                    style={{ marginRight: 16 }}
                    color="red"
                    circular
                    size="small"
                    onClick={logout}
                  >
                    {t('header.disconnect')}
                  </Button>
                ) : (
                  <>
                    <Button
                      style={{ marginRight: 16, width: 130 }}
                      circular
                      primary
                      onClick={connect}
                    >
                      {t('header.connect')}
                    </Button>
                  </>
                )}
              </NavLinks>
            </>
          )}

          <BurgerWrapper>
            <BurgerMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
          </BurgerWrapper>
        </FlexContainer>
      </HeaderContainer>
      <CollapseMenu navbarState={props.navbarState} handleNavbar={props.handleNavbar} />
    </>
  );
};

export default Header;
