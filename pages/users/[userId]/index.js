import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import moment from 'moment';
import Link from 'next/link';
import ReactStars from 'react-rating-stars-component';
import { useSession, getSession } from 'next-auth/client';

import Head from 'next/head';
import styled from 'styled-components';

import { Confirm, Card, Button } from 'semantic-ui-react';

import styles from '../../../styles/Home.module.css';
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

const ActionsContainer = styled.div`
  display: flex;
}`;

const Description = styled.div`
  height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}`;

const CardUserContainer = styled.div`
  height: 370px;
  width: ${(p) => p.percent}%;
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

const CardContainer = styled.div`
  height: 400px;
  width: ${(p) => p.percent}%;
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

const User = (props) => {
  console.log('props', props);
  const { user: { _id, name, image, movies, followers, followings } = {}, userIdParam } = props;
  const [session, loading] = useSession();

  const isMyProfile = userIdParam === (session && session.id);

  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [movieId, setMovieId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const open = (movieId) => {
    setMovieId(movieId);
    setConfirm(true);
  };

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const handleClickDescription = ({ movieId, description }) => {
    if (description) {
      return null;
    }
    router.push(`/movies/${movieId}`);
  };

  const close = () => setConfirm(false);

  const deleteNote = async () => {
    try {
      await fetch(`${process.env.API_URL}/api/movies/${movieId}`, {
        method: 'Delete',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (movieId) => {
    setIsDeleting(movieId);
    close();
  };

  return (
    <AuthPage title="Users">
      <PageContainer>
        <Row>
          <Col xs={12} md={3}>
            <CardUserContainer>
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
            </CardUserContainer>
          </Col>
          <Col xs={12} md={9}>
            <Text marginBottom={24} fontSize={32}>
              {isMyProfile
                ? 'My movies'
                : `His movies ${movies.length > 0 ? `(${movies.length})` : ''}`}
            </Text>

            {movies && movies.length === 0 && (
              <EmptyState>
                <Text fontSize={16} marginBottom={16}>
                  {isMyProfile
                    ? 'You have not added movies yet'
                    : `${name} has not added movies yet.`}
                </Text>
              </EmptyState>
            )}

            <List>
              {movies &&
                movies.length > 0 &&
                movies.map((movie) => {
                  const {
                    _id,
                    description,
                    themoviedbId,
                    title,
                    image,
                    vote_count,
                    rating,
                  } = movie;

                  return (
                    <CardContainer key={_id} percent={isMobile ? 100 : isTablet ? 50 : 25}>
                      <CardMovie
                        title={title}
                        imageUrl={`https://image.tmdb.org/t/p/w500/${image}`}
                        href={`/movies/${themoviedbId}`}
                        amountVotes={vote_count}
                        userRating={rating}
                        imageHeight={60}
                        centered
                      >
                        <Box alignItems="center">
                          {rating && (
                            <ReactStars
                              count={5}
                              size={24}
                              color2={'#ffd700'}
                              color1={'#d3d3d3'}
                              value={rating}
                              isHalf
                              edit={false}
                              className={styles.stars}
                            />
                          )}
                          <Description>{description || 'Add a description...'}</Description>
                          <ActionsContainer>
                            <Button
                              size="tiny"
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`/users/${_id}/movies/${_id}/edit`);
                              }}
                              primary
                            >
                              Edit
                            </Button>
                            <Button
                              size="tiny"
                              primary
                              onClick={(e) => {
                                console.log('heyyy');
                                e.preventDefault();
                                return open(_id);
                              }}
                            >
                              Delete
                            </Button>
                          </ActionsContainer>
                        </Box>
                      </CardMovie>
                    </CardContainer>
                  );
                })}
            </List>
          </Col>
        </Row>
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </PageContainer>
    </AuthPage>
  );
};

User.getInitialProps = async (ctx) => {
  const { query: { userId } = {} } = ctx;

  const res = await fetch(`${process.env.API_URL}/api/users/${userId}`);

  const { data } = await res.json();
  return { user: data, userIdParam: userId };
};

export default User;
