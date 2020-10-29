import React from 'react';
import ReactStars from 'react-stars';

import { useState, useEffect } from 'react';
import { Breadcrumb, Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Page from '../../../components/Page';
import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';

import styles from '../../../styles/Home.module.css';

const EditMovie = (props) => {
  const { movie } = props;

  console.log('movie', movie);
  const [form, setForm] = useState({
    description: movie.description,
    rating: movie.rating,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateMovie();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateMovie = async () => {
    try {
      await fetch(`http://localhost:3000/api/movies/${router.query.movieId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      router.push('/my_movies');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChangeRating = (newRating) => {
    setForm({
      ...form,
      rating: newRating,
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.description) {
      err.description = 'Description is required';
    }

    return err;
  };

  console.log('form', form);
  return (
    <Page title="Edit movie">
      <PageContainer>
        <Link href="/my_movies">Movies</Link>
        <div>Edit movie</div>

        <Breadcrumb style={{ marginBottom: 24 }} size={'huge'}>
          <Breadcrumb.Section href={'/my_movies'} link>
            Movies
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Edit movie</Breadcrumb.Section>
        </Breadcrumb>

        <div>
          {isSubmitting ? (
            <Loader active inline="centered" />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.TextArea
                label="Description"
                placeholder="Description"
                name="description"
                error={
                  errors.description
                    ? {
                        content: 'Please enter a description',
                        pointing: 'below',
                      }
                    : null
                }
                value={form.description}
                onChange={handleChange}
              />

              <Text marginBottom={8} isBold>
                Rating
              </Text>

              <ReactStars
                count={5}
                onChange={handleChangeRating}
                size={24}
                color2={'#ffd700'}
                color1={'#d3d3d3'}
                value={form.rating}
                style={{ marginBottom: 10 }}
                half
                className={styles.stars}
              />

              <Button type="submit">Update</Button>
            </Form>
          )}
        </div>
      </PageContainer>
    </Page>
  );
};

EditMovie.getInitialProps = async ({ query: { movieId } }) => {
  const res = await fetch(`http://localhost:3000/api/movies/${movieId}`);
  const { data } = await res.json();

  return { movie: data, namespacesRequired: ['common'] };
};

export default EditMovie;
