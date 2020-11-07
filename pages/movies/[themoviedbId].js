import React, { useState, useEffect } from 'react';
import { Form, Button, Icon, Divider } from 'semantic-ui-react';
import ReactStars from 'react-stars';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import moment from 'moment';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import Box from 'components/Box';
import CardMovie from 'components/CardMovie';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

import { useGetSession } from 'utils/session';

import getHourMinutesFromMinutes from 'utils/getHourMinutesFromMinutes';

import useIsMobile from 'hooks/useIsMobile';

export const ContentContainer = styled.div`
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

export const SubContainer = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(5.88%, 27.45%, 27.06%, 1) 150px,
    rgba(10.59%, 36.47%, 36.08%, 0.84) 100%
  );

  display: flex;

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(p) => (p.isMobile ? 0 : 24)}px;
  min-width: ${(p) => p.width}px;
`;

export const Right = styled.div`
  padding: 32px 0px;
  padding-left: 40px;

  @media (max-width: 769px) {
    padding: 8px 16px;
  }
`;

export const Title = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
`;
export const Infos = styled.div`
  color: #ffffff;
`;

const View = (props) => {
  const {
    // userMovie,
    // userMovie: {
    //   _id: userMovieId,
    //   rating: userMovieRating,
    //   description: userMovieDescription,
    // } = {},
    isFound,
    movie: { backdrop_path, poster_path, runtime, title, overview, release_date, genres } = {},
  } = props;

  const router = useRouter();

  const { themoviedbId } = router.query;
  const isMobile = useIsMobile();
  const { session } = useGetSession();

  console.log('11222', session);
  const [user, setUser] = useState(null);
  const [userMovie, setUserMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

  const [isSubmittingMovie, setIsSubmittingMovie] = useState(false);
  const [isSubmittingMovieToWatch, setIsSubmittingMovieToWatch] = useState(false);

  const [isInMoviesToWatch, setIsInMoviesToWatch] = useState(false);

  const [form, setForm] = useState({
    themoviedbId,
    title: title,
    image: poster_path,
    description: null,
    rating: null,
  });

  useEffect(() => {
    // setForm({ ...form, description: userMovieDescription, rating: userMovieRating });
  }, [userMovie]);

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
      await fetch(`${process.env.API_URL}/api/movies`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      router.push(`/users/${session.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/movie/${themoviedbId}/similar?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=fr`,
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
    const fetchLoggedUser = async () => {
      console.log('fetchLoggedUser');
      try {
        const request = await fetch(`${process.env.API_URL}/api/users/${session.id}`);

        const { data } = await request.json();
        console.log('data', data);
        setUser(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    console.log('sessionsessionsessionsession', session);
    if (session && !user) {
      fetchLoggedUser();
    }
  }, [session]);

  useEffect(() => {
    console.log('user', user);
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
        user &&
          user.moviesToWatch.find((movieToWatch) => movieToWatch.themoviedbId === themoviedbId),
      );
    }
  }, [themoviedbId, user]);

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, [themoviedbId]);

  const submitMovieToWatch = async () => {
    try {
      console.log('hey');
      const request = await fetch(`${process.env.API_URL}/api/movies/towatch`, {
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
      console.log('error', error);
      console.log(error);
    }
  };

  const editMovie = async () => {
    try {
      await fetch(`${process.env.API_URL}/api/users/${session.id}/movies/${userMovie._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      router.push(`/users/${session.id}`);
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

  if (!isFound) {
    return <div>not found</div>;
  }

  console.log('userMovie', userMovie);
  return (
    <Page title="login">
      <PageContainer>
        <ContentContainer
          imageUrl={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`}
        >
          <SubContainer>
            <Left isMobile={isMobile} width={isMobile ? window.screen.width - 32 : null}>
              <img
                height="350px"
                width={isMobile ? '100%' : null}
                alt="paster_path"
                style={{ borderRadius: isMobile ? 0 : 16, marginBottom: isMobile ? 8 : 0 }}
                src={`//image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
              />
            </Left>
            <Right>
              <Box alignItems="center" flexDirection="row">
                <Text isBold marginRight={8} marginBottom={4} fontSize={30} textColor="#ffffff">
                  {title}
                </Text>
                {release_date.substring(0, 4) && (
                  <Text marginTop={4} isBold fontSize={16} marginRight={8} textColor="#ffffff">
                    ({release_date.substring(0, 4)})
                  </Text>
                )}
              </Box>

              <Text marginBottom={16} textColor="#ffffff">
                {genres.map((genre) => {
                  return <span key={genre.name}>{genre.name} - </span>;
                })}
                {getHourMinutesFromMinutes(runtime)}
              </Text>

              <Text isBold marginBottom={8} fontSize={22} textColor="#ffffff">
                Description
              </Text>
              <Text marginBottom={24} fontSize={16} textColor="#ffffff">
                {overview}
              </Text>

              <Divider />

              <Text isBold marginTop={8} marginBottom={4} fontSize={24} textColor="#ffffff">
                {isInMoviesToWatch ? (
                  <div>
                    <span>Movie in to watch list</span>
                    <Icon color="green" name="check" style={{ marginLeft: 8 }} />
                  </div>
                ) : (
                  'Save in to-watch list'
                )}
              </Text>
              <Button
                color={isInMoviesToWatch ? 'red' : 'blue'}
                onClick={handleSubmitMovieToWatch}
                loading={isSubmittingMovieToWatch}
                style={{ marginTop: 8, marginBottom: 8 }}
              >
                {isInMoviesToWatch ? 'Supprimer' : 'Ajouter'}
              </Button>

              <Divider style={{ color: 'white' }} horizontal>
                Or
              </Divider>

              <Text isBold marginTop={16} fontSize={24} textColor="#ffffff">
                {userMovie ? (
                  <div>
                    <span>You have saved this movie</span>
                    <Icon color="green" name="check" style={{ marginLeft: 8 }} />
                  </div>
                ) : (
                  'Save this movie'
                )}
              </Text>

              <Text isBold marginTop={16} marginBottom={8} fontSize={14} textColor="#ffffff">
                {userMovie ? 'Your rating:' : 'Rate this movie:'}
              </Text>

              <ReactStars
                count={5}
                onChange={handleChangeRating}
                size={24}
                color2={'#ffd700'}
                color1={'#d3d3d3'}
                value={form.rating}
                half
              />

              <Form
                onSubmit={
                  session
                    ? handleSubmitMovie
                    : () => {
                        router.push('/login');
                      }
                }
              >
                <Text isBold marginTop={16} marginBottom={8} fontSize={14} textColor="#ffffff">
                  {userMovie ? 'Your description:' : 'Add a description'}
                </Text>

                <Form.TextArea
                  placeholder="Write a personnal note for this movie"
                  name="description"
                  value={form.description || ''}
                  onChange={handleChangeDescription}
                  style={{ width: isMobile ? null : 600 }}
                />
                <Button loading={!!isSubmittingMovie} color="green" style={{ marginTop: 10 }}>
                  {userMovie ? 'Edit' : 'Ajouter'}
                </Button>
                {errors.rating && (
                  <Text isBold textColor="#ffffff" marginBottom={8} marginTop={8} fontSize={14}>
                    * Rating is required
                  </Text>
                )}
              </Form>
            </Right>
          </SubContainer>
        </ContentContainer>

        {similarMovies && similarMovies.length > 0 && (
          <>
            <Text marginTop={36} marginBottom={36} fontSize={32}>
              Similar movies
            </Text>
            <List>
              {similarMovies.slice(0, 5).map((movie) => {
                const { id, title, poster_path, vote_average, release_date } = movie;

                return (
                  <CardContainer key={id} height={350} percent={isMobile ? 100 : 20}>
                    <CardMovie
                      title={title}
                      subtitle={moment(release_date).format('MMM, YYYY')}
                      imageUrl={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      href={`/movies/${id}`}
                      grade={vote_average}
                    />
                  </CardContainer>
                );
              })}
            </List>
          </>
        )}
      </PageContainer>
    </Page>
  );
};

View.getInitialProps = async (context) => {
  const { query: { themoviedbId } = {} } = context;

  const promises = [
    // movie
    fetch(
      `https://api.themoviedb.org/3/movie/${themoviedbId}?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=fr`,
    ),
  ];

  return Promise.all(promises)
    .then((responses) => {
      return Promise.all(
        responses.map((response) => {
          return response.json();
        }),
      );
    })
    .then((data) => {
      const [movie = {}] = data;

      return {
        movie,
        isFound: movie.success !== false,
        namespacesRequired: ['common'],
      };
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default View;
