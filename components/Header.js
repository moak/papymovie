/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useSpring, animated } from 'react-spring';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { signOut, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import Link from 'next/link';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';

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
  background-color: ${(p) => (p.isTransparent ? 'transparent' : p.theme.headerBackground)};
  z-index: 3;
  font-size: 14px;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 1.5rem;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
`;

const NavLinks = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: ${(p) => p.color};
    font-weight: 600;
    text-transform: uppercase;
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
  const { toggleTheme, theme, navbarState } = props;

  const { t } = useTranslation('common');

  const { data: session } = useSession();

  const [isTransparent, setIsTransparent] = useState(true);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const router = useRouter();

  const [search, setSearch] = useState(router.query.search || '');

  const languages = [
    { lang: 'en', display: 'EN' },
    { lang: 'fr', display: 'FR' },
  ];

  const handleChangeSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const deleteSearch = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      setSearch('');

      router.push(`/search?search=`);
    },
    [search],
  );

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
    signIn(null, { callbackUrl: `${window.location.href}` });
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
    if (window.scrollY <= 0) {
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
      <HeaderContainer theme={theme} style={barAnimation}>
        <FlexContainer>
          {isMobile ? (
            <Link href={session ? '/community' : '/'} passHref>
              <svg width="40" height="40" viewBox="0 -5 80 77" style={{ marginBottom: 12 }}>
                <g
                  id="SvgjsG4951"
                  featurekey="symbolFeature-0"
                  transform="matrix(0.7186096237138837,0,0,0.7186096237138837,-7.1860962371388375,-4.913421237224502)"
                  fill={theme.text}
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill={theme.text}
                    d="M16.309,50.072c-0.578,0-1.309,0.144-1.309,0.722v36.112c0,0.578,0.73,1.166,1.309,1.166H68v-38H16.309z   M65,80.708c0,2.962-2.401,5.364-5.364,5.364H23.364c-2.963,0-5.364-2.402-5.364-5.364V57.437c0-2.962,2.401-5.364,5.364-5.364  h36.271c2.963,0,5.364,2.402,5.364,5.364V80.708z"
                  ></path>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill={theme.text}
                    d="M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M83.561,50.072  H70v38h13.561c0.578,0,1.439-0.588,1.439-1.166V50.794C85,50.216,84.139,50.072,83.561,50.072z M77.345,52.32  c2.842,0,5.146,2.304,5.146,5.146s-2.304,5.146-5.146,5.146c-2.844,0-5.147-2.304-5.147-5.146S74.501,52.32,77.345,52.32z   M73.704,67.042c2.011-2.01,5.27-2.01,7.278,0c2.01,2.01,2.01,5.268,0,7.277c-2.009,2.01-5.268,2.01-7.278,0  C71.694,72.31,71.694,69.052,73.704,67.042z M79,86.072h-7v-1h7V86.072z M81.836,86.817c-0.771,0-1.395-0.624-1.395-1.395  c0-0.772,0.624-1.396,1.395-1.396s1.396,0.624,1.396,1.396C83.232,86.193,82.606,86.817,81.836,86.817z M78,53.072h-1v8h1V53.072z   M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M75.124,73.829l-0.925-0.925l5.458-5.458l0.926,0.925L75.124,73.829z"
                  ></path>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill={theme.text}
                    d="M85.981,45.072h-4.042c-0.54-3-2.943-4.729-6.306-5.892L88.427,4.368c0.436,0.094,0.81-0.038,0.892-0.263  c0.1-0.272-0.26-0.679-0.803-0.878c-0.543-0.198-1.063-0.152-1.162,0.118c-0.068,0.186,0.078,0.417,0.352,0.611L74.886,38.732  c-1.651-0.485-3.503-0.758-5.456-0.758c-2.396,0-4.637,0.408-6.546,1.117L43.965,0.744c0.26-0.234,0.384-0.5,0.289-0.679  c-0.135-0.257-0.66-0.245-1.172,0.024c-0.51,0.27-0.816,0.696-0.682,0.951c0.11,0.208,0.476,0.239,0.884,0.101l18.868,38.456  c-2.795,1.207-4.752,2.476-5.232,5.476h-42.9c-1.951,0-4.02,1.154-4.02,3.105v43.439c0,1.951,2.068,3.456,4.02,3.456h2.589  c0.237,0,0.455,0.167,0.57,0.374l2.579,4.599c0.012,0.02,0.032,0.027,0.057,0.027h57.727c0.206,0,0.401-0.074,0.524-0.238  l3.313-4.473c0.123-0.165,0.318-0.289,0.525-0.289h4.077c1.95,0,4.019-1.505,4.019-3.456V48.178  C90,46.227,87.932,45.072,85.981,45.072z M87,89.109c0,1.084-0.879,1.963-1.962,1.963H14.962c-1.083,0-1.962-0.879-1.962-1.963  V49.035c0-1.084,0.879-1.963,1.962-1.963h70.076c1.083,0,1.962,0.879,1.962,1.963V89.109z"
                  ></path>
                </g>
              </svg>
            </Link>
          ) : (
            <Brand
              theme={theme}
              isConnected={!!session}
              color={isTransparent && router.pathname === '/' ? 'white' : theme.text}
            />
          )}
          <form onSubmit={submitSearch} style={{ marginRight: 10 }}>
            <SearchBar
              width={isMobile ? 230 : 350}
              isMobile={isMobile}
              placeholder={t('header.search')}
              onChange={handleChangeSearch}
              value={search || ''}
              onSubmit={submitSearch}
              onDelete={deleteSearch}
            />
          </form>

          {!isMobile && !isTablet && (
            <>
              <NavLinks style={{ ...linkAnimation }}>
                {languages.map((language, index) => (
                  <React.Fragment key={language.display}>
                    {index > 0 && (
                      <span
                        style={{
                          margin: '0 6px',
                          color:
                            isTransparent && router.pathname === '/' ? theme.textLight : theme.text,
                        }}
                      >
                        |
                      </span>
                    )}

                    <span // eslint-disable-line jsx-a11y/click-events-have-key-events
                      onClick={() => {
                        moment.locale(language.lang);
                        handleLocaleChange(language.lang);
                      }}
                      style={{
                        fontWeight: router.locale === language.lang ? 700 : 500,
                        cursor: 'pointer',
                        color:
                          isTransparent && router.pathname === '/'
                            ? theme.white
                            : router.locale === language.lang
                            ? theme.text
                            : theme.textLight,
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
            <BurgerMenu navbarState={navbarState} handleNavbar={props.handleNavbar} />
          </BurgerWrapper>
        </FlexContainer>
        {!isMobile && !isTablet && (
          <>
            <HeaderActions
              isLanding={router.pathname === '/'}
              isTransparent={isTransparent}
              theme={theme}
              toggleTheme={toggleTheme}
              session={session}
            />
          </>
        )}
      </HeaderContainer>
      <CollapseMenu theme={theme} toggleTheme={toggleTheme} navbarState={navbarState} />
    </>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), { ssr: false });
