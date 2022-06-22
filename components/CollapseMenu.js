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

const languages = [
  { lang: 'fr', display: 'FR' },
  { lang: 'en', display: 'EN' },
];

const CollapseMenu = (props) => {
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
              <Link href="/">{t('header.home')}</Link>
            </li>
          )}
          <li>
            <Link href="/movies">{t('header.movies')}</Link>
          </li>
          <li>
            <Link href="/community">{t('header.community')}</Link>
          </li>
          <li>
            <Link href="/users">{t('header.users')}</Link>
          </li>

          {session ? (
            <>
              <li>
                <Link href={`/users/${session?.user?.id}`}>{t('header.my_profile')}</Link>
              </li>
              <hr />

              <li>
                <a onClick={signOut}>{t('header.disconnect')}</a>
              </li>
            </>
          ) : (
            <>
              <hr />
              <li>
                <a onClick={signIn}>{t('header.connect')}</a>
              </li>
            </>
          )}
          <hr />

          <li>
            {languages.map((language, index) => (
              <React.Fragment key={language.display}>
                {index > 0 && (
                  <span
                    style={{
                      fontSize: 18,

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
                    fontSize: 18,
                    cursor: 'pointer',
                    color: router.locale === language.lang ? '#ffffff' : 'grey',
                    marginRight: index + 1 === languages.length ? 20 : 0,
                  }}
                >
                  {language.display}
                </span>
              </React.Fragment>
            ))}
          </li>
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
