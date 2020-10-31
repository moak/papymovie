import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import moment from 'moment';

import Head from 'next/head';
import { useSession, getSession } from 'next-auth/client';
import styled from 'styled-components';

import { Confirm, Card, Button } from 'semantic-ui-react';

import useIsMobile from '../../../hooks/useIsMobile';
import useIsTablet from '../../../hooks/useIsTablet';

import PageContainer from '../../../components/PageContainer';
import AuthPage from '../../../components/AuthPage';
import Box from '../../../components/Box';
import Text from '../../../components/Text';
import EmptyState from '../../../components/EmptyState';
import CardMovie from '../../../components/CardMovie';
import CardUser from '../../../components/CardUser';

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

const User = (props) => {
  console.log('props', props);
  const { user: { _id, name, image, movies, followers, followings } = {} } = props;
  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <AuthPage title="Users">
      <PageContainer>
        <Row>
          <Col xs={12} md={3}>
            <CardContainer>
              <CardUser
                name={name}
                imageUrl={image}
                href={`/users/${_id}`}
                infos={[
                  { amount: movies.length, title: 'Movies' },
                  { amount: followers.length, title: 'Followers' },
                  { amount: followings.length, title: 'Following' },
                ]}
              />
            </CardContainer>
          </Col>
          <Col xs={12} md={9}>
            <Text marginBottom={24} fontSize={32}>
              His movies {movies.length > 0 ? `(${movies.length})` : null}
            </Text>
            <List>
              {movies.map((movie) => {
                const { _id, themoviedbId, title, image, vote_count, rating } = movie;

                return (
                  <CardContainer key={_id} percent={isMobile ? 100 : isTablet ? 50 : 25}>
                    <CardMovie
                      title={title}
                      imageUrl={`https://image.tmdb.org/t/p/w500/${image}`}
                      href={`/movies/${themoviedbId}`}
                      amountVotes={vote_count}
                      userRating={rating}
                    />
                  </CardContainer>
                );
              })}
            </List>
          </Col>
        </Row>
      </PageContainer>
    </AuthPage>
  );
};

User.getInitialProps = async (ctx) => {
  const { query: { userId } = {} } = ctx;

  const res = await fetch(`${process.env.API_URL}/api/users/${userId}`);

  const { data } = await res.json();
  return { user: data };
};

export default User;
