import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactStars from 'react-rating-stars-component';

import Head from 'next/head';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/client';
import styled from 'styled-components';

import { Confirm, Card, Grid, Button } from 'semantic-ui-react';

import PageContainer from '../../components/PageContainer';
import AuthPage from '../../components/AuthPage';
import Box from '../../components/Box';
import Text from '../../components/Text';

import styles from '../../styles/Home.module.css';

const List = styled.div`
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}`;

const CardContainer = styled.div`
  height: 400px;
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
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

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = (movieId) => {
    setMovieId(movieId);
    setConfirm(true);
  };

  const close = () => setConfirm(false);

  const deleteNote = async () => {
    try {
      await fetch(`http://localhost:3000/api/movies/${movieId}`, {
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

  return (
    <AuthPage title="Movies">
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          My movies
        </Text>

        <List>
          {movies.map((movie) => {
            const { _id, rating, themoviedbId, title, description, image } = movie;

            return (
              <CardContainer key={themoviedbId}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <div>{title}</div>
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
                    <div style={{ marginBottom: 10 }}>{description}</div>
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
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </PageContainer>
    </AuthPage>
  );
};

Movies.getInitialProps = async (ctx) => {
  console.log('ctx', ctx);
  const res = await fetch('http://localhost:3000/api/movies');

  console.log('res', res);
  const { data } = await res.json();
  return { movies: data };
};

export default Movies;
