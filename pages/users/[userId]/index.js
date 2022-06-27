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

const User = (props) => {
  const { theme, toggleTheme } = props;

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

      setUser({
        ...user,
        followers: data,
      });
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

  const finalMovies = movies.filter((movie) => movie.mediaType !== 'serie');
  const finalSeries = movies.filter((movie) => movie.mediaType === 'serie');

  console.log('finalSeries', finalSeries);
  return (
    <Page
      title={t('view.metas.title', { name })}
      description={t('view.metas.description', { name })}
      url={`/users/${_id}`}
      previewImage={image}
      isLoading={!user}
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer>
        <Row>
          <Col xs={12} md={3}>
            <CardContainer height={isMobile ? 280 : 350}>
              <CardUser
                theme={theme}
                isMobile={isMobile}
                name={name}
                imageUrl={image}
                infos={[
                  { amount: movies?.length, title: t('media') },
                  {
                    amount: user?.followers.length,
                    title: t('followers'),
                  },
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
                <Text textColor={theme.text} marginTop={24} marginBottom={8} fontSize={18} isBold>
                  {t('view.watching_list')}
                  {moviesToWatch.length > 0 ? ` (${moviesToWatch.length})` : ''}
                </Text>

                {moviesToWatch && moviesToWatch.length === 0 && (
                  <EmptyState>
                    <Text textColor={theme.text} fontSize={14}>
                      {t('view.watching_list_no_result')}
                    </Text>
                  </EmptyState>
                )}

                <List>
                  {moviesToWatch?.length
                    ? moviesToWatch.map((movieToWatch) => {
                        console.log('movieToWatch', movieToWatch);
                        const { _id, title, themoviedbId, image, mediaType } = movieToWatch;

                        return (
                          <CardContainer
                            background={theme.background}
                            key={_id}
                            height={isMobile ? 200 : 180}
                            percent={50}
                          >
                            <CardImage
                              theme={theme}
                              isMobile
                              title={title}
                              imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                              href={`/movies/${themoviedbId}?type=${
                                mediaType === 'serie' ? 'serie' : 'movie'
                              }`}
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
            <Text marginBottom={12} fontSize={18} isBold textColor={theme.text}>
              {isMyProfile ? t('view.my_profile_my_movies') : `${t('view.users_movies')}`} (
              {finalMovies?.length})
            </Text>

            {finalMovies && finalMovies.length === 0 && (
              <EmptyState>
                <Text textColor={theme.text} fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_movies') : t('view.no_movies')}
                </Text>
              </EmptyState>
            )}

            <List>
              {finalMovies?.length > 0 &&
                finalMovies.map((movie) => {
                  const { _id, description, themoviedbId, title, image, rating } = movie;

                  return (
                    <CardContainer key={_id} percent={isMobile ? 50 : isTablet ? 33 : 25}>
                      <CardMovie
                        theme={theme}
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
                          <Text
                            textAlign="center"
                            cursor="pointer"
                            marginBottom={8}
                            textColor={theme.text}
                            dotdotdot
                            width={`100%`}
                          >
                            {isMyProfile
                              ? description || t('view.add_description')
                              : description || t('view.no_description')}
                          </Text>

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

            <Text marginBottom={12} fontSize={18} isBold textColor={theme.text}>
              {isMyProfile ? t('view.my_profile_my_series') : `${t('view.users_series')}`} (
              {finalSeries?.length})
            </Text>

            {finalSeries && finalSeries.length === 0 && (
              <EmptyState>
                <Text textColor={theme.text} fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_series') : t('view.no_series')}
                </Text>
              </EmptyState>
            )}

            <List>
              {finalSeries?.length > 0 &&
                finalSeries.map((movie) => {
                  const { _id, description, themoviedbId, title, image, rating } = movie;

                  return (
                    <CardContainer key={_id} percent={isMobile ? 50 : isTablet ? 33 : 25}>
                      <CardMovie
                        theme={theme}
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
                          <Text
                            textAlign="center"
                            cursor="pointer"
                            marginBottom={8}
                            textColor={theme.text}
                            dotdotdot
                            width={`100%`}
                          >
                            {isMyProfile
                              ? description || t('view.add_description')
                              : description || t('view.no_description')}
                          </Text>

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

            <Text textColor={theme.text} marginTop={24} marginBottom={12} fontSize={18} isBold>
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
                        theme={theme}
                        isMobile={isMobile}
                        href={`/users/${_id}`}
                        name={name}
                        imageUrl={image}
                        infos={[
                          { amount: movies.length, title: t('media') },
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
                <Text textColor={theme.text} fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_followings') : t('view.no_followings')}
                </Text>
              </EmptyState>
            )}
            <Text textColor={theme.text} marginTop={24} marginBottom={12} fontSize={18} isBold>
              {t('followers')}
            </Text>
            <List>
              {followers?.map((follower) => {
                const { _id, name, followings, followers, movies, image } = follower;
                return (
                  <CardContainer
                    key={_id}
                    height={isMobile ? 280 : 350}
                    percent={isMobile ? 100 : 33}
                  >
                    <CardUser
                      theme={theme}
                      isMobile={isMobile}
                      href={`/users/${_id}`}
                      name={name}
                      imageUrl={image}
                      infos={[
                        { amount: movies.length, title: t('media') },
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
                <Text textColor={theme.text} fontSize={16}>
                  {isMyProfile ? t('view.my_profile_no_followers') : t('view.no_followers')}
                </Text>
              </EmptyState>
            )}
          </Col>
        </Row>
        <Confirm
          style={{ color: theme.text }}
          open={confirm}
          onCancel={close}
          onConfirm={handleDelete}
          header={t('view.delete_movie_title')}
          content={
            <Text padding={24} textColor={theme.black}>
              {t('view.delete_movie_confirmation')}
            </Text>
          }
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
