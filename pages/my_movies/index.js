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

import styles from '../../styles/Home.module.css';

const List = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}`;

const CardContainer = styled.div`
  // height: 450px;
  width: ${(p) => p.percent}%;
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

const Description = styled.div`
  height: 30px;
  margin-bottom: 8px;
  margin-top: 16px;
  cursor: ${(p) => p.cursor};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}`;

const Image = styled.img`
  height: 300px;
}`;

const Movies = (props) => {
  const { movies } = props;
  console.log('movies', movies);
  const [movieId, setMovieId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = (movieId) => {
    setMovieId(movieId);
    setConfirm(true);
  };

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

      router.push('/my_movies');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (movieId) => {
    setIsDeleting(movieId);
    close();
  };

  console.log('movies', movies);
  return (
    <AuthPage title="Movies">
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          My movies {movies && movies.length > 0 && `(${movies.length})`}
        </Text>

        {!movies && (
          <EmptyState>
            <Text fontSize={16} marginBottom={16}>
              Register and start saving your movies!
            </Text>
            <Button primary onClick={() => router.push('/login')}>
              Register
            </Button>
          </EmptyState>
        )}

        {movies && movies.length === 0 ? (
          <EmptyState>
            <Text fontSize={16} marginBottom={16}>
              You don't have any movies yet.
            </Text>
            <Button primary onClick={() => router.push('/discover')}>
              Start adding movies
            </Button>
          </EmptyState>
        ) : (
          <List>
            {movies &&
              movies.map((movie) => {
                const { _id, rating, themoviedbId, title, description, image } = movie;

                return (
                  <CardContainer key={themoviedbId} percent={isMobile ? 100 : 25}>
                    <Card>
                      <Card.Content>
                        <Card.Header>
                          <Text isBold marginBottom={8} textAlign="center">
                            {title}
                          </Text>
                          <Image width="100%" src={`https://image.tmdb.org/t/p/w500/${image}`} />
                        </Card.Header>
                      </Card.Content>

                      <Card.Content extra>
                        <Box alignItems="center">
                          <ReactStars
                            count={5}
                            size={24}
                            color2={'#ffd700'}
                            color1={'#d3d3d3'}
                            value={rating}
                            style={{ marginBottom: 10 }}
                            isHalf
                            edit={false}
                            className={styles.stars}
                          />
                        </Box>
                        <Description
                          cursor={description ? 'auto' : 'pointer'}
                          onClick={() =>
                            handleClickDescription({ movieId: themoviedbId, description })
                          }
                        >
                          {description || 'Write a description...'}
                        </Description>
                        <Link href={`/movies/${themoviedbId}`}>
                          <Button primary>View</Button>
                        </Link>
                        <Link href={`/my_movies/${_id}/edit`}>
                          <Button primary>Edit</Button>
                        </Link>
                        <Button
                          primary
                          onClick={(e) => {
                            e.preventDefault;

                            return open(_id);
                          }}
                        >
                          Delete
                        </Button>
                      </Card.Content>
                    </Card>
                  </CardContainer>
                );
              })}
          </List>
        )}

        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </PageContainer>
    </AuthPage>
  );
};

Movies.getInitialProps = async (ctx) => {
  console.log('ctx', ctx);
  console.log('process.env', process.env);

  const res = await fetch(`${process.env.API_URL}/api/movies`);

  console.log('res', res);
  const { data } = await res.json();
  return { movies: data };
};

export default Movies;
