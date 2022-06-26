import React, { useState, useEffect } from 'react';
import { Form, Button, Icon, Divider, TextArea } from 'semantic-ui-react';
import ReactStars from 'react-stars';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import Box from 'components/Box';
import CardMovie from 'components/CardMovie';
import CardContainer from 'components/CardContainer';
import List from 'components/List';
import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';
import getHourMinutesFromMinutes from 'utils/getHourMinutesFromMinutes';
import { truncate } from 'utils/string';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

const ContentContainer = styled.div`
  height: 100%;
  border-bottom: 1px solid rgba(8.24%, 31.96%, 31.57%, 1);
  background-position: right -200px top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(p) => p.imageUrl});

  @media (max-width: 769px) {
    height: 100%;
  }
`;

const SubContainer = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(5.88%, 27.45%, 27.06%, 1) 150px,
    rgba(10.59%, 36.47%, 36.08%, 0.84) 100%
  );

  // background-image: linear-gradient(to right, ${(p) => p.color1} 150px, ${(p) => p.color2} 100%);

  display: flex;

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(p) => (p.isMobile ? 0 : 24)}px;
  min-width: ${(p) => p.width};
`;

const Right = styled.div`
  padding: 32px 0px;
  padding-left: 40px;

  @media (max-width: 769px) {
    padding: 8px 16px;
  }
`;

const View = (props) => {
  const {
    movie,
    movie: {
      backdrop_path,
      poster_path,
      runtime,
      title,
      overview,
      release_date,
      genres,
      vote_average,
    } = {},
    toggleTheme,
    theme,
  } = props;

  const { locale } = useRouter();

  const { t } = useTranslation('movie');

  const router = useRouter();

  const { themoviedbId } = router.query;
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { data: session } = useSession();

  const [user, setUser] = useState(null);
  const [actors, setActors] = useState([]);
  const [userMovie, setUserMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

  const [isSubmittingMovie, setIsSubmittingMovie] = useState(false);
  const [isSubmittingMovieToWatch, setIsSubmittingMovieToWatch] = useState(false);

  const [isInMoviesToWatch, setIsInMoviesToWatch] = useState(false);

  const [form, setForm] = useState({
    themoviedbId,
    title,
    image: poster_path,
    description: null,
    rating: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.rating) {
      err.rating = 'Rating is required';
    }

    return err;
  };

  const handleSubmitMovie = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmittingMovie(true);
  };

  const handleSubmitMovieToWatch = (e) => {
    e.preventDefault();
    setIsSubmittingMovieToWatch(true);
  };

  const handleChangeRating = (newRating) => {
    setForm({
      ...form,
      rating: newRating,
    });
  };

  const handleChangeDescription = (e) => {
    setForm({
      ...form,
      description: e.target.value,
    });
  };

  const createMovie = async () => {
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/movies`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      router.push(`/users/${session.user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/movie/${themoviedbId}/similar?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${locale}`,
        );
        const { results } = await request.json();

        setSimilarMovies(results);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchSimilarMovies();
  }, [themoviedbId]);

  useEffect(() => {
    const fetchCreditMovie = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/movie/${themoviedbId}/credits?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${locale}`,
        );
        const { cast } = await request.json();

        setActors(cast);
      } catch (error) {
        console.log('error', error);
      }
    };

    if (!isMobile && !isTablet) {
      fetchCreditMovie();
    }
  }, [themoviedbId]);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const request = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${session.user.id}`);
        const { data } = await request.json();

        setUser(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    if (session && !user) {
      fetchLoggedUser();
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      const userMovie = user.movies.find((movie) => movie.themoviedbId === themoviedbId);

      setUserMovie(userMovie);
      setForm({
        ...form,
        description: userMovie ? userMovie.description : null,
        rating: userMovie ? userMovie.rating : null,
      });
    }
  }, [themoviedbId, user]);

  useEffect(() => {
    if (user) {
      setIsInMoviesToWatch(
        user?.moviesToWatch.find((movieToWatch) => movieToWatch.themoviedbId === themoviedbId),
      );
    }
  }, [themoviedbId, user]);

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, [themoviedbId]);

  const submitMovieToWatch = async () => {
    try {
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/movies/towatch`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          themoviedbId: form.themoviedbId,
          title: form.title,
          image: form.image,
        }),
      });

      const { isInMoviesToWatch } = await request.json();

      setIsInMoviesToWatch(!isInMoviesToWatch);

      setIsSubmittingMovieToWatch(false);
    } catch (error) {
      setIsSubmittingMovieToWatch(false);
    }
  };

  const editMovie = async () => {
    try {
      await fetch(
        `${process.env.NEXTAUTH_URL}/api/users/${session.user.id}/movies/${userMovie._id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        },
      );

      router.push(`/users/${session.user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async () => {
    try {
      await fetch(
        `${process.env.NEXTAUTH_URL}/api/users/${session.user.id}/movies/${userMovie._id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      router.push(`/users/${session.user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmittingMovie) {
      if (Object.keys(errors).length === 0) {
        if (userMovie) {
          editMovie();
        } else {
          createMovie();
        }
      } else {
        setIsSubmittingMovie(false);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (isSubmittingMovieToWatch) {
      submitMovieToWatch();
    } else {
      setIsSubmittingMovieToWatch(false);
    }
  }, [isSubmittingMovieToWatch]);

  if (!movie) {
    return null;
  }

  return (
    <Page
      title={t('view.metas.title', { title, date: release_date?.substring(0, 4) })}
      previewImage={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
      url={`/movies/${themoviedbId}`}
      description={overview ? truncate(overview, 100) : null}
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer>
        <ContentContainer
          imageUrl={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`}
        >
          <SubContainer color1={theme.text} color2={theme.textLight}>
            <Left isMobile={isMobile} width={isMobile ? `${window.screen.width} - 32}` : '20%'}>
              <img
                height="350px"
                width={isMobile ? '70%' : null}
                alt="paster_path"
                style={{
                  borderRadius: 16,
                  marginBottom: isMobile ? 8 : 0,
                  marginTop: isMobile ? 16 : 0,
                }}
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
              />
            </Left>
            <Right>
              <Box alignItems="center" flexDirection={isMobile ? 'column' : 'row'}>
                {!isMobile && (
                  <RoundedLabel borderWith={2} rounded color={getColorFromMark(vote_average)}>
                    {vote_average}
                  </RoundedLabel>
                )}
                <Text
                  textColor={theme.white}
                  textAlign={isMobile ? 'center' : 'left'}
                  isBold
                  marginRight={8}
                  marginLeft={4}
                  marginBottom={4}
                  fontSize={isMobile ? 24 : 30}
                  marginTop={isMobile ? 4 : 0}
                >
                  {title}
                </Text>
                {!isMobile && release_date?.substring(0, 4) && (
                  <Text textColor={theme.white} isBold fontSize={16} marginLeft={4}>
                    ({release_date?.substring(0, 4)})
                  </Text>
                )}
              </Box>

              {isMobile && (
                <Box
                  marginTop={4}
                  marginBottom={12}
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="row"
                >
                  <RoundedLabel borderWith={2} rounded color={getColorFromMark(vote_average)}>
                    {vote_average}
                  </RoundedLabel>

                  {release_date?.substring(0, 4) && (
                    <Text textColor={theme.white} isBold fontSize={16} marginLeft={8}>
                      ({release_date?.substring(0, 4)})
                    </Text>
                  )}
                </Box>
              )}

              <Text textColor={theme.white} marginBottom={16} textColor="#ffffff">
                {genres.map((genre) => {
                  return <span key={genre.name}>{genre.name} - </span>;
                })}
                {getHourMinutesFromMinutes(runtime)}
              </Text>

              <Text textColor={theme.white} isBold marginBottom={8} fontSize={22}>
                Description
              </Text>
              <Text textColor={theme.white} lineHeight="20px" marginBottom={24} fontSize={14}>
                {overview}
              </Text>

              <Divider />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text textColor={theme.white} isBold fontSize={24} marginRight={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text
                      textColor={theme.white}
                      isBold
                      fontSize={isMobile ? (userMovie ? 16 : 24) : 24}
                      marginRight={8}
                    >
                      {userMovie ? t('view.my_profile_saved') : t('view.save')}
                    </Text>
                  </div>
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text
                  textColor={theme.white}
                  isBold
                  marginTop={16}
                  marginBottom={8}
                  marginRight={4}
                  fontSize={14}
                >
                  {userMovie ? t('view.my_profile_rating') : t('view.rate_movie')}
                </Text>
                {form.rating ? (
                  <RoundedLabel
                    marginTop={6}
                    width="30px"
                    height="30px"
                    borderWith={2}
                    rounded
                    color={getColorFromMark(form.rating)}
                  >
                    {form.rating}
                  </RoundedLabel>
                ) : null}
              </div>

              <ReactStars
                count={10}
                onChange={handleChangeRating}
                size={24}
                color2={'#ffd700'}
                color1={'#d3d3d3'}
                value={form.rating}
                half={false}
              />

              <Text textColor={theme.white} isBold marginTop={16} marginBottom={8} fontSize={14}>
                {userMovie ? t('view.my_profile_description') : t('view.add_description')}
              </Text>

              <Form>
                <TextArea
                  placeholder={t('view.description_placeholder')}
                  name="description"
                  value={form.description || ''}
                  onChange={handleChangeDescription}
                  style={{ width: isMobile ? null : 600, fontSize: isMobile ? 16 : 14 }}
                />
              </Form>
              <Button
                onClick={session ? handleSubmitMovie : signIn}
                size="small"
                loading={!!isSubmittingMovie}
                color="green"
                style={{ marginTop: 10 }}
              >
                {userMovie ? t('view.edit') : t('view.add')}
              </Button>
              {errors.rating && (
                <Text textColor={theme.white} isBold marginBottom={8} marginTop={8} fontSize={14}>
                  {t('view.rating_required')}
                </Text>
              )}

              {userMovie ? (
                <Button
                  color={'red'}
                  onClick={deleteMovie}
                  style={{ marginTop: 8, marginBottom: 8 }}
                  size="small"
                >
                  {t('view.delete')}
                </Button>
              ) : null}

              <Divider horizontal>
                {userMovie ? (
                  <Icon style={{ fontSize: 25 }} color="green" name="check" />
                ) : (
                  <Text textColor={theme.white} fontSize={20} textColor="#ffffff" isBold>
                    {t('view.or')}
                  </Text>
                )}
              </Divider>

              <Text textColor={theme.white} isBold marginTop={8} marginBottom={4} fontSize={18}>
                {isInMoviesToWatch ? (
                  <div>
                    <span>{t('view.watching_list')}</span>
                    <Icon color="green" name="check" style={{ marginLeft: 8 }} />
                  </div>
                ) : (
                  t('view.save_watching_list')
                )}
              </Text>
              <Button
                color={isInMoviesToWatch ? 'red' : 'blue'}
                onClick={session ? handleSubmitMovieToWatch : signIn}
                loading={isSubmittingMovieToWatch}
                style={{ marginTop: 8, marginBottom: 8 }}
                size="small"
              >
                {isInMoviesToWatch ? t('view.delete') : t('view.add')}
              </Button>
            </Right>
          </SubContainer>
        </ContentContainer>

        {actors && actors.length > 0 && (
          <>
            <div>
              <Text textColor={theme.white} marginTop={36} marginBottom={16} fontSize={32}>
                {t('view.actors')}
              </Text>
              <List>
                {actors.slice(0, 6).map((actor) => {
                  const { id, name, profile_path, character } = actor;

                  return (
                    <CardContainer key={id} percent={isMobile ? 33 : 15}>
                      <CardMovie
                        theme={theme}
                        title={name}
                        subtitle={character}
                        imageUrl={`https://image.tmdb.org/t/p/w138_and_h175_face/${profile_path}`}
                        height={isMobile ? '120px' : '220px'}
                      />
                    </CardContainer>
                  );
                })}
              </List>
            </div>
            <hr />
          </>
        )}

        {similarMovies && similarMovies.length > 0 && (
          <div>
            <Text textColor={theme.white} marginTop={36} marginBottom={16} fontSize={32}>
              {t('view.similar_movies')}
            </Text>
            <List>
              {similarMovies.slice(0, 5).map((movie) => {
                const { id, title, poster_path, vote_average, release_date } = movie;

                return (
                  <CardContainer
                    key={id}
                    height={isMobile ? 280 : isTablet ? 300 : 400}
                    percent={isMobile || isTablet ? 50 : 20}
                  >
                    <CardMovie
                      theme={theme}
                      title={title}
                      subtitle={moment(release_date).format('MMM, YYYY')}
                      imageUrl={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                      href={`/movies/${id}`}
                      userRating={vote_average}
                    />
                  </CardContainer>
                );
              })}
            </List>
          </div>
        )}
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { themoviedbId },
    locale,
  } = context;

  const url = `https://api.themoviedb.org/3/movie/${themoviedbId}?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${locale}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'movie'])),
      movie: data,
    },
  };
}

export default View;
