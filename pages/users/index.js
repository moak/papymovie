import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';

import Head from 'next/head';
import { useSession, getSession } from 'next-auth/client';
import styled from 'styled-components';

import { Confirm, Card, Grid, Button } from 'semantic-ui-react';

import useIsMobile from '../../hooks/useIsMobile';

import PageContainer from '../../components/PageContainer';
import AuthPage from '../../components/AuthPage';
import Box from '../../components/Box';
import Text from '../../components/Text';
import EmptyState from '../../components/EmptyState';
import CardUser from '../../components/CardUser';

const List = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}`;

const CardContainer = styled.div`
  height: 350px;
  width: ${(p) => p.percent}%;
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

const Movies = (props) => {
  const { users } = props;
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <AuthPage title="Users">
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          Users {users && users.length > 0 && `(${users.length})`}
        </Text>

        {!users || (users && users.length === 0) ? (
          <EmptyState>No users on the platform.</EmptyState>
        ) : (
          <List>
            {users.map((user) => {
              const { _id, name, image } = user;

              console.log('user', user);

              return (
                <CardContainer key={_id} percent={isMobile ? 100 : 25}>
                  <CardUser
                    name={name}
                    imageUrl={image}
                    href={`/users/${_id}`}
                    infos={[
                      { amount: user.movies.length, title: 'Movies' },
                      { amount: user.followings.length, title: 'Followers' },
                      { amount: user.followings.length, title: 'Following' },
                    ]}
                  />
                </CardContainer>
              );
            })}
          </List>
        )}
      </PageContainer>
    </AuthPage>
  );
};

Movies.getInitialProps = async (ctx) => {
  console.log('ctx', ctx);
  console.log('process.env', process.env);

  const res = await fetch(`${process.env.API_URL}/api/users`);

  console.log('res', res);
  const { data } = await res.json();
  return { users: data };
};

export default Movies;
