import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-styled-flexboxgrid';
import ReactStars from 'react-rating-stars-component';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';
import { Confirm, Button, Icon } from 'semantic-ui-react';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

import PageContainer from 'components/PageContainer';
import AuthPage from 'components/AuthPage';
import Box from 'components/Box';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardMovie from 'components/CardMovie';
import CardUser from 'components/CardUser';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

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
  background-color: #fff;
  margin-bottom: 16px;
}`;

const User = (props) => {
  const {
    user: { _id, name, image, movies, followers, followings, moviesToWatch } = {},
    userIdParam,
  } = props;
  const [session, loading] = useSession();
  const [followersState, setFollowersState] = useState(followers);
  const [isFollowRequestLoading, setIsFollowRequestLoading] = useState(false);

  const isMyProfile = userIdParam === (session && session.id);
  const isFollowing = isMyProfile
    ? false
    : !!followersState.find((follower) => follower === (session && session.id));

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

  const handleClickFollow = async () => {
    try {
      setIsFollowRequestLoading(true);

      const request = await fetch(`${process.env.API_URL}/api/users/${_id}/follow`, {
        method: 'Post',
      });

      const { data } = await request.json();

      setFollowersState(data);
      setIsFollowRequestLoading(false);
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
                infos={[
                  { amount: movies.length, title: 'Movies' },
                  { amount: followersState.length, title: 'Followers' },
                  { amount: followings.length, title: 'Following' },
                ]}
              />
            </CardUserContainer>

            {!isMyProfile && (
              <Button
                loading={isFollowRequestLoading}
                color={isFollowing ? 'red' : 'blue'}
                fluid
                onClick={handleClickFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
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
                    <CardContainer
                      key={_id}
                      height={400}
                      percent={isMobile ? 100 : isTablet ? 50 : 25}
                    >
                      <CardMovie
                        title={title}
                        imageUrl={`https://image.tmdb.org/t/p/w500/${image}`}
                        href={`/movies/${themoviedbId}`}
                        amountVotes={vote_count}
                        userRating={rating}
                        imageHeight={isMyProfile ? 60 : 70}
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
                            />
                          )}
                          <Description>{description || 'Add a description...'}</Description>

                          <ActionsContainer>
                            {isMyProfile ? (
                              <>
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`/movies/${themoviedbId}`);
                                  }}
                                  primary
                                  icon
                                >
                                  <Icon name="pencil" />
                                </Button>

                                <Button
                                  color="red"
                                  onClick={(e) => {
                                    console.log('heyyy');
                                    e.preventDefault();
                                    return open(_id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : null}
                          </ActionsContainer>
                        </Box>
                      </CardMovie>
                    </CardContainer>
                  );
                })}
            </List>

            <Text marginTop={24} marginBottom={24} fontSize={32}>
              To watch later
              {moviesToWatch.length > 0 ? ` (${moviesToWatch.length})` : ''}
            </Text>

            {moviesToWatch && moviesToWatch.length === 0 && (
              <EmptyState>
                <Text fontSize={16} marginBottom={16}>
                  No movies in the to watch list
                </Text>
              </EmptyState>
            )}

            <List>
              {moviesToWatch &&
                moviesToWatch.length > 0 &&
                moviesToWatch.map((movieToWatch) => {
                  const { _id, title, themoviedbId, image } = movieToWatch;

                  return (
                    <CardContainer
                      key={_id}
                      height={300}
                      percent={isMobile ? 100 : isTablet ? 50 : 25}
                    >
                      <CardMovie
                        title={title}
                        imageUrl={`https://image.tmdb.org/t/p/w500/${image}`}
                        href={`/movies/${themoviedbId}`}
                        imageHeight={80}
                        centered
                      />
                    </CardContainer>
                  );
                })}
            </List>
          </Col>
        </Row>
        <Confirm
          open={confirm}
          onCancel={close}
          onConfirm={handleDelete}
          header="Delete movie"
          content="Are you sure you want to delete this movie ?"
        />
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
