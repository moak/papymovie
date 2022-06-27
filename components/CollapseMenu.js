/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signOut, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';

import ToggleTheme from './ToggleTheme';

const Separator = styled.div`
  width: 100%;
  background-color: ${(p) => p.color};

  // height: 1px;
  margin: 4px 0;
}`;

const CollapseWrapper = styled(animated.div)`
  background: ${(p) => p.background};
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
    }
  }
`;

const languages = [
  { lang: 'en', display: 'EN' },
  { lang: 'fr', display: 'FR' },
];

const ClosableLink = (props) => {
  const { handleNavbar, display, currentPath, closablePath, href, theme } = props;

  let isCurrent = currentPath === closablePath;

  if (currentPath)
    return (
      <Link href={href}>
        <div
          style={{ color: isCurrent ? '#fdcb6e' : theme.text }}
          onClick={() => {
            return handleNavbar(false);
          }}
        >
          {display}
        </div>
      </Link>
    );
};

const CollapseMenu = (props) => {
  const { handleNavbar, toggleTheme, theme } = props;

  const { t } = useTranslation('common');

  const router = useRouter();
  const { data: session } = useSession();

  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const handleLocaleChange = (data) => {
    router.replace(router.asPath, router.asPath, { locale: data });
  };

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        background={theme.background}
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
          {!session && (
            <li>
              <ClosableLink
                theme={theme}
                display={t('header.home')}
                handleNavbar={handleNavbar}
                currentPath={router.asPath}
                href="/"
                closablePath="/"
              />
            </li>
          )}
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.movies')}
              handleNavbar={handleNavbar}
              currentPath={router.asPath}
              href="/movies?type=movie"
              closablePath="/movies?type=movie"
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.series')}
              handleNavbar={handleNavbar}
              currentPath={router.asPath}
              href="/movies?type=serie"
              closablePath="/movies?type=serie"
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.community')}
              handleNavbar={handleNavbar}
              currentPath={router.asPath}
              href="/community"
              closablePath="/community"
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.users')}
              handleNavbar={handleNavbar}
              currentPath={router.asPath}
              href="/users"
              closablePath="/users"
            />
          </li>

          {session ? (
            <>
              <li>
                <ClosableLink
                  theme={theme}
                  display={t('header.my_profile')}
                  handleNavbar={handleNavbar}
                  currentPath={router.asPath}
                  href={`/users/${session?.user?.id}`}
                  closablePath={`/users/${session?.user?.id}`}
                />
              </li>
              <Separator color={theme.textLight} />

              <li>
                <a style={{ color: theme.text }} onClick={signOut}>
                  {t('header.disconnect')}
                </a>
              </li>
            </>
          ) : (
            <>
              <Separator color={theme.textLight} />
              <li>
                <ClosableLink
                  theme={theme}
                  display={t('header.connect')}
                  handleNavbar={handleNavbar}
                  currentPath={router.pathname}
                  closablePath={`/signin`}
                  href="/signin"
                  onClick={signIn}
                />
              </li>
            </>
          )}
          <Separator color={theme.textLight} />

          <li style={{ marginTop: 8 }}>
            {languages.map((language, index) => (
              <React.Fragment key={language.display}>
                {index > 0 && (
                  <span
                    style={{
                      fontSize: 18,
                      margin: '0 6px',
                      color: theme.text,
                    }}
                  >
                    |
                  </span>
                )}

                <span // eslint-disable-line jsx-a11y/click-events-have-key-events
                  onClick={() => handleLocaleChange(language.lang)}
                  style={{
                    fontWeight: router.locale === language.lang ? 700 : 500,
                    fontSize: 18,
                    cursor: 'pointer',
                    color: router.locale === language.lang ? theme.text : theme.textLight,
                    marginRight: index + 1 === languages.length ? 20 : 0,
                  }}
                >
                  {language.display}
                </span>
              </React.Fragment>
            ))}
          </li>

          <li style={{ marginTop: 12 }}>
            <ToggleTheme toggleTheme={toggleTheme} />
          </li>
          <Separator color={theme.textLight} />
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;
