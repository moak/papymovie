import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import { Confirm, Button, Icon } from 'semantic-ui-react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

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

const User = () => {
  const { t } = useTranslation('user');

  const router = useRouter();

  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [followersState, setFollowersState] = useState([]);
  const [isFollowRequestLoading, setIsFollowRequestLoading] = useState(false);

  const { userId } = router.query;

  const isMyProfile = userId === session?.user?.id;

  const isFollowing = isMyProfile
    ? false
    : !!followersState.find(
        (follower) => (follower || follower?._id) === (session && session?.user?.id),
      );

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

  const fetchUser = async () => {
    const url = `${process.env.NEXTAUTH_URL}/api/users/${userId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data } = await res.json();

    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  const close = () => setConfirm(false);

  const deleteMovie = async () => {
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/movies/${movieId}`, {
        method: 'Delete',
      });

      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFollow = async () => {
    try {
      setIsFollowRequestLoading(true);

      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${_id}/follow`, {
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

  const {
    _id,
    name,
    image,
    movies = [],
    followings = [],
    followers = [],
    moviesToWatch = [],
  } = user || {};

  return (
    <Page
      title={t('view.metas.title', { name })}
      description={t('view.metas.description', { name })}
      url={`/users/${_id}`}
      previewImage={image}
      isLoading={!user}
    >
      <PageContainer>
        <Row>
          <Col xs={12} md={3}>
            <CardContainer height={isMobile ? 280 : 350}>
              <CardUser
                isMobile={isMobile}
                name={name}
                imageUrl={image}
                infos={[
                  { amount: movies.length, title: t('movies') },
                  { amount: followersState.length, title: t('followers') },
                  { amount: followings.length, title: t('followings') },
                ]}
              />
            </CardContainer>

            {!isMyProfile && (
              <Button
                style={{ marginBottom: isMobile ? 16 : 0 }}
                loading={isFollowRequestLoading}
                color={isFollowing ? 'red' : 'blue'}
                fluid
                onClick={session ? handleClickFollow : signIn}
              >
                {isFollowing ? t('unfollow') : t('follow')}
              </Button>
            )}

            {isMyProfile || moviesToWatch.length ? (
              <>
                <Text marginTop={24} fontSize={18}>
                  {t('view.watching_list')}
                  {moviesToWatch.length > 0 ? ` (${moviesToWatch.length})` : ''}
                </Text>

                {moviesToWatch && moviesToWatch.length === 0 && (
                  <EmptyState>
                    <Text fontSize={14}>{t('view.watching_list_no_result')}</Text>
                  </EmptyState>
                )}

                <List>
                  {moviesToWatch?.length
                    ? moviesToWatch.map((movieToWatch) => {
                        const { _id, title, themoviedbId, image } = movieToWatch;

                        return (
                          <CardContainer key={_id} height={isMobile ? 200 : 180} percent={50}>
                            <CardImage
                              isMobile
                              title={title}
                              imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                              href={`/movies/${themoviedbId}`}
                            />
                          </CardContainer>
                        );
                      })
                    : null}
                </List>
              </>
            ) : null}
          </Col>

          <Col xs={12} md={9}>
            <Text marginBottom={24} marginTop={isMobile ? 8 : 0} fontSize={isMobile ? 24 : 32}>
              {isMyProfile
                ? t('view.my_profile_my_movies')
                : `${t('view.users_movies', { name: user?.name })} ${
                    movies.length > 0 ? `(${movies.length})` : ''
                  }`}
            </Text>

            {movies && movies.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_movies') : t('view.no_movies')}
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
                      percent={isMobile ? 50 : isTablet ? 33 : 25}
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
                                  {t('view.delete')}
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

            <Text marginTop={24} fontSize={18}>
              {t('followings')}
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
                          { amount: movies.length, title: t('movies') },
                          { amount: followers.length, title: t('followers') },
                          { amount: followings.length, title: t('followings') },
                        ]}
                      />
                    </CardContainer>
                  );
                })}
            </List>
            {followings && followings.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_followings') : t('view.no_followings')}
                </Text>
              </EmptyState>
            )}
            <Text marginTop={24} fontSize={18}>
              {t('followers')}
            </Text>
            <List>
              {followers?.map((follower) => {
                console.log('follower', follower);
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
                        { amount: movies.length, title: t('movies') },
                        { amount: followers.length, title: t('followers') },
                        { amount: followings.length, title: t('followings') },
                      ]}
                    />
                  </CardContainer>
                );
              })}
            </List>
            {followers?.length === 0 && (
              <EmptyState>
                <Text fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_followers') : t('view.no_followers')}
                </Text>
              </EmptyState>
            )}
          </Col>
        </Row>
        <Confirm
          open={confirm}
          onCancel={close}
          onConfirm={handleDelete}
          header={t('view.delete_movie_title')}
          content={t('view.delete_movie_confirmation')}
        />
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'user'])),
    },
  };
}

export default User;
