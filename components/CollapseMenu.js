/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { signOut, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/router';
import moment from 'moment';

import { useTranslation } from 'next-i18next';

import ToggleTheme from './ToggleTheme';

const Separator = styled.div`
  width: 100%;
  background-color: ${(p) => p.color};
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
  const { display, href, theme, isCurrent, onClick, isBold } = props;

  if (onClick) {
    return (
      <div
        onClick={onClick}
        style={{
          color: isCurrent ? '#fdcb6e' : theme.text,
          fontWeight: isBold ? 'bold' : 'normal',
        }}
      >
        {display}
      </div>
    );
  }
  return (
    <Link href={href}>
      <div style={{ color: isCurrent ? '#fdcb6e' : theme.text }}>{display}</div>
    </Link>
  );
};

const CollapseMenu = (props) => {
  const { toggleTheme, theme, navbarState } = props;

  const { t } = useTranslation('common');

  const router = useRouter();
  const { userId } = router.query;

  const { data: session } = useSession();

  const { open } = useSpring({ open: navbarState ? 0 : 1 });

  const isMyProfile = userId === session?.user?.id;

  const handleLocaleChange = (data) => {
    router.replace(router.asPath, router.asPath, { locale: data });
  };

  const logout = useCallback(() => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }, []);

  const connect = useCallback(() => {
    signIn(null, { callbackUrl: `${window.location.href}` });
  }, []);

  if (navbarState === true) {
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
                currentPath={router.asPath}
                href="/"
                closablePath="/"
                isCurrent={router.asPath === '/'}
              />
            </li>
          )}
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.movies')}
              currentPath={router.asPath}
              href="/movies"
              closablePath="movies"
              isCurrent={!router.asPath.includes('/signin') && router.asPath.includes('movie')}
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.series')}
              currentPath={router.asPath}
              href="/series"
              closablePath="series"
              isCurrent={!router.asPath.includes('/signin') && router.asPath.includes('serie')}
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.community')}
              currentPath={router.asPath}
              href="/community"
              closablePath="community"
              isCurrent={!router.asPath.includes('/signin') && router.asPath.includes('community')}
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.quizz')}
              currentPath={router.asPath}
              href="/quizz"
              closablePath="quizz"
              isCurrent={!router.asPath.includes('/signin') && router.asPath.includes('quizz')}
            />
          </li>
          <li>
            <ClosableLink
              theme={theme}
              display={t('header.users')}
              currentPath={router.asPath}
              href="/users"
              closablePath="users"
              isCurrent={
                (!session && router.asPath.includes('/users')) ||
                (!isMyProfile && router.asPath.includes('/users'))
              }
            />
          </li>

          {session ? (
            <>
              <li>
                <ClosableLink
                  theme={theme}
                  display={t('header.my_profile')}
                  currentPath={router.asPath}
                  href={`/users/${session?.user?.id}`}
                  closablePath={`users/${session?.user?.id}`}
                  isCurrent={isMyProfile || router.asPath.includes(`users/[userId]`)}
                />
              </li>
              <Separator color={theme.textLight} />

              <li>
                <a style={{ color: theme.text }} onClick={logout}>
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
                  currentPath={router.pathname}
                  closablePath={`/signin`}
                  href="/signin"
                  isBold
                  onClick={connect}
                  isCurrent={router.asPath.includes(`/signin`)}
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
                  onClick={() => {
                    moment.locale(language.lang);
                    handleLocaleChange(language.lang);
                  }}
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
