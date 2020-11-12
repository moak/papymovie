import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import { Confirm, Button, Icon } from 'semantic-ui-react';
import { useSession } from 'next-auth/client';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

import PageContainer from 'components/PageContainer';
import Page from 'components/Page';
import Box from 'components/Box';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardMovie from 'components/CardMovie';
import CardUser from 'components/CardUser';
import CardImage from 'components/CardImage';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

const ActionsContainer = styled.div`
  display: flex;
}`;

const Description = styled.div`
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}`;

const User = (props) => {
  const { user } = props;
  const router = useRouter();

  const [session] = useSession();
  const [userState, setUserState] = useState(user);
  const [followersState, setFollowersState] = useState(user.followers);
  const [isFollowRequestLoading, setIsFollowRequestLoading] = useState(false);

  const { userId } = router.query;

  const isMyProfile = userId === (session && session.id);

  const isFollowing = isMyProfile
    ? false
    : !!followersState.find((follower) => (follower || follower._id) === (session && session.id));

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
      deleteMovie();
    }
  }, [isDeleting]);

  useEffect(async () => {
    const { user } = await fetchData({ query: { userId: userId } });
    setUserState(user);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, [userId]);

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  const close = () => setConfirm(false);

  const deleteMovie = async () => {
    try {
      await fetch(`${process.env.API_URL}/api/movies/${movieId}`, {
        method: 'Delete',
      });
      const { user } = await fetchData({ query: { userId: session.id } });
      setUserState(user);
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

  const { _id, name, image, movies, followings, followers, moviesToWatch } = userState;

  return (
    <Page title={`${isMyProfile ? 'My profile' : name} - PapyMovie`}>
      <PageContainer>
        <Row>
          <Col xs={12} md={3}>
            <CardContainer height={isMobile ? 280 : 350}>
              <CardUser
                isMobile={isMobile}
                name={name}
                imageUrl={image}
                infos={[
                  { amount: movies.length, title: 'Movies' },
                  { amount: followersState.length, title: 'Followers' },
                  { amount: followings.length, title: 'Following' },
                ]}
              />
            </CardContainer>

            {!isMyProfile && (
              <Button
                style={{ marginBottom: isMobile ? 16 : 0 }}
                loading={isFollowRequestLoading}
                color={isFollowing ? 'red' : 'blue'}
                fluid
                onClick={
                  session
                    ? handleClickFollow
                    : () => {
                        router.push('/login');
                      }
                }
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}

            {isMyProfile || moviesToWatch.length ? (
              <>
                <Text marginTop={24} marginBottom={24} fontSize={24}>
                  Watching list
                  {moviesToWatch.length > 0 ? ` (${moviesToWatch.length})` : ''}
                </Text>

                {moviesToWatch && moviesToWatch.length === 0 && (
                  <EmptyState>
                    <Text fontSize={16} marginBottom={16}>
                      No movies in the watching list
                    </Text>
                  </EmptyState>
                )}

                <List>
                  {moviesToWatch &&
                    moviesToWatch.length > 0 &&
                    moviesToWatch.map((movieToWatch) => {
                      const { _id, title, themoviedbId, image } = movieToWatch;

                      return (
                        <CardContainer key={_id} height={160} percent={50}>
                          <CardImage
                            isMobile
                            title={title}
                            imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                            href={`/movies/${themoviedbId}`}
                          />
                        </CardContainer>
                      );
                    })}
                </List>
              </>
            ) : null}
          </Col>
          <Col xs={12} md={9}>
            <Text marginBottom={24} marginTop={isMobile ? 8 : 0} fontSize={isMobile ? 24 : 32}>
              {isMyProfile
                ? 'My movies'
                : `${user.name || user.email}'s movies ${
                    movies.length > 0 ? `(${movies.length})` : ''
                  }`}
            </Text>

            {movies && movies.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile ? 'You have not added movies yet' : `No movies.`}
                </Text>
              </EmptyState>
            )}

            <List>
              {movies &&
                movies.length > 0 &&
                movies.map((movie) => {
                  const { _id, description, themoviedbId, title, image, rating } = movie;

                  return (
                    <CardContainer
                      key={_id}
                      height={isMobile ? 330 : 400}
                      percent={isMobile || isTablet ? 50 : 25}
                    >
                      <CardMovie
                        isMobile={isMobile}
                        title={title}
                        imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                        href={`/movies/${themoviedbId}`}
                        imageHeight={isMyProfile ? 70 : 70}
                        isMyProfile={isMyProfile}
                        userRating={rating}
                        titleCentered
                      >
                        <Box flexDirection="column" alignItems="center">
                          <Description>
                            {isMobile ? description || 'No notes' : description || 'Add a note...'}
                          </Description>

                          <ActionsContainer>
                            {isMyProfile ? (
                              <>
                                <Button
                                  size="tiny"
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
                                  size="tiny"
                                  color="red"
                                  onClick={(e) => {
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

            <Text marginTop={24} marginBottom={16} fontSize={24}>
              Followings
            </Text>
            <List>
              {followings &&
                followings.map((following) => {
                  const { _id, name, followings, followers, movies, image } = following;
                  return (
                    <CardContainer
                      key={_id}
                      height={isMobile ? 280 : 350}
                      percent={isMobile ? 100 : 33}
                    >
                      <CardUser
                        isMobile={isMobile}
                        href={`/users/${_id}`}
                        name={name}
                        imageUrl={image}
                        infos={[
                          { amount: movies.length, title: 'Movies' },
                          { amount: followers.length, title: 'Followers' },
                          { amount: followings.length, title: 'Following' },
                        ]}
                      />
                    </CardContainer>
                  );
                })}
            </List>
            {followings && followings.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile
                    ? 'You do not follow anyone yet'
                    : `This user does not follow anyone.`}
                </Text>
              </EmptyState>
            )}
            <Text marginTop={24} marginBottom={16} fontSize={24}>
              Followers
            </Text>
            <List>
              {followers &&
                followers.map((follower) => {
                  const { _id, name, followings, followers, movies, image } = follower;
                  return (
                    <CardContainer
                      key={_id}
                      height={isMobile ? 280 : 350}
                      percent={isMobile ? 100 : 33}
                    >
                      <CardUser
                        isMobile={isMobile}
                        href={`/users/${_id}`}
                        name={name}
                        imageUrl={image}
                        infos={[
                          { amount: movies.length, title: 'Movies' },
                          { amount: followers.length, title: 'Followers' },
                          { amount: followings.length, title: 'Following' },
                        ]}
                      />
                    </CardContainer>
                  );
                })}
            </List>
            {followers && followers.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile ? 'You do not have any followers' : `This user as no followers.`}
                </Text>
              </EmptyState>
            )}
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
    </Page>
  );
};

async function fetchData(ctx) {
  const { query: { userId } = {} } = ctx;
  const res = await fetch(`${process.env.API_URL}/api/users/${userId}`);
  const { data } = await res.json();

  return { user: data };
}

User.getInitialProps = fetchData;

export default User;
