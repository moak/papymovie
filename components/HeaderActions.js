import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ToggleTheme from './ToggleTheme';

import Users from 'public/icons/Users';
import Movies from 'public/icons/Movies';
import Social from 'public/icons/Social';
import Home from 'public/icons/Home';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
`;

const ContainerItem = styled.div`
  padding: 10px 0 20px 0;
  width: 130px;
  cursor: pointer;
  ${(p) => (p.isCurrent ? `  border-bottom: 4px red solid;` : null)}
`;
const ContainerHoverItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  &:hover {
    text-decoration: none;
    background: ${(p) => p.hover};
  }
`;
const ContainerItemName = styled.div`
  font-weight: bold;
  color: ${(p) => p.color};
`;
const ToggleThemeContainer = styled.div`
  margin-left: 30px;
`;

const HeaderActions = (props) => {
  const { toggleTheme, session, theme, isTransparent, isLanding } = props;

  const { t } = useTranslation('common');

  const router = useRouter();

  const actions = [
    {
      name: t('header.movies'),
      path: '/movies',
      genericPath: '/movies',
      svg: (
        <Movies
          width={20}
          height={20}
          color={isTransparent && isLanding ? theme.white : theme.text}
        />
      ),
    },
    {
      name: t('header.community'),
      path: '/community',
      genericPath: '/community',
      svg: (
        <Social
          width={20}
          height={20}
          color={isTransparent && isLanding ? theme.white : theme.text}
        />
      ),
    },
    {
      name: t('header.users'),
      path: '/users',
      genericPath: '/users',
      svg: (
        <Users
          width={20}
          height={20}
          color={isTransparent && isLanding ? theme.white : theme.text}
        />
      ),
    },
  ];

  if (session) {
    actions.push({
      name: t('header.my_profile'),
      genericPath: '/users/[userId]',
      path: `/users/${session && session?.user?.id}`,
      svg: <Home width={20} height={20} color={theme.text} />,
    });
  }

  return (
    <Container>
      {actions.map((action, index) => {
        const isCurrent = router.pathname === action.genericPath;

        return (
          <Link key={index} href={action.path}>
            <ContainerItem theme={theme} isCurrent={isCurrent}>
              <ContainerHoverItem hover={isTransparent && isLanding ? 'transparent' : theme.hover}>
                <div>{action.svg}</div>
                <ContainerItemName color={isTransparent && isLanding ? theme.white : theme.text}>
                  {action.name}
                </ContainerItemName>
              </ContainerHoverItem>
            </ContainerItem>
          </Link>
        );
      })}
      <ToggleThemeContainer isConnected={!!session}>
        <ToggleTheme toggleTheme={toggleTheme} />
      </ToggleThemeContainer>
    </Container>
  );
};

export default HeaderActions;
