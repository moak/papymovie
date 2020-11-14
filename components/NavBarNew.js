import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Button, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { signOut, signIn } from 'next-auth/client';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

import { i18n, withTranslation } from 'i18n';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

const NavBarContainer = styled(({ isTransparent, ...props }) => (
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

const SearchContainer = styled.div`
  width: ${(p) => (p.isMobile ? 350 : 350)}px;
  margin: auto 0;
`;

const NavBarNew = (props) => {
  const { t } = props;
  const { language: userLanguage } = i18n;

  const [session, loading] = useSession();
  const [isTransparent, setIsTransparent] = useState(true);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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

  return (
    <>
      <NavBarContainer
        style={barAnimation}
        isTransparent={router.pathname === '/' && isTransparent}
      >
        <FlexContainer>
          {(((!isMobile || router.pathname == '/') && isTransparent) || !isMobile) && (
            <Brand isConnected={!!session} />
          )}

          {(router.pathname !== '/' || (router.pathname === '/' && !isTransparent)) && (
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
                  placeholder={t('header.search')}
                  value={search || ''}
                />
              </form>
            </SearchContainer>
          )}

          <NavLinks style={{ ...linkAnimation, width: 300 }}>
            {!isMobile && !isTablet && (
              <>
                <Link href={`/${userLanguage}/movies`}>{t('header.movies')}</Link>
                <Link href={`/${userLanguage}/community`}>{t('header.community')}</Link>
                <Link href={`/${userLanguage}/users`}>{t('header.users')}</Link>
                {session && (
                  <Link href={`/users/${session && session.id}`}>{t('header.my_profile')}</Link>
                )}
              </>
            )}
          </NavLinks>

          <NavLinks style={{ ...linkAnimation }}>
            <a>
              <span
                onClick={(e) => {
                  e.preventDefault;
                  i18n.changeLanguage('fr');
                }}
                style={{ color: userLanguage === 'fr' ? '#ffffff' : 'grey' }}
              >
                FR
              </span>{' '}
              |{' '}
              <span
                onClick={(e) => {
                  e.preventDefault;
                  i18n.changeLanguage('en');
                }}
                style={{ color: userLanguage === 'en' ? '#ffffff' : 'grey' }}
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
                    {t('header.disconnect')}
                  </Button>
                ) : (
                  <>
                    <Button
                      style={{ marginRight: 16, width: 130 }}
                      circular
                      primary
                      onClick={signIn}
                    >
                      {t('header.connect')}
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

NavBarNew.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  };
};

export default withTranslation('common')(NavBarNew);
