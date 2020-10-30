import React, { useState, useEffect } from 'react';
import { Breadcrumb, Label, Form, Button } from 'semantic-ui-react';
import ReactStars from 'react-stars';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import styles from '../../styles/Home.module.css';
import Page from '../../components/Page';
import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import Box from '../../components/Box';

import getColorFromMark from '../../utils/getColorFromMark';
import getHourMinutesFromMinutes from '../../utils/getHourMinutesFromMinutes';

export const ContentContainer = styled.div`
  height: 600px;
  border-bottom: 1px solid rgba(8.24%, 31.96%, 31.57%, 1);
  background-position: right -200px top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(p) => p.imageUrl});
`;

export const SubContainer = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(5.88%, 27.45%, 27.06%, 1) 150px,
    rgba(10.59%, 36.47%, 36.08%, 0.84) 100%
  );

  display: flex;
  height: 100%;
`;
export const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

export const Right = styled.div`
  padding: 32px 0px;
  padding-left: 40px;
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
    isFound,
    movie: {
      backdrop_path,
      poster_path,
      runtime,
      vote_average,
      title,
      overview,
      release_date,
      genres,
    } = {},
  } = props;

  const router = useRouter();

  const { movieId } = router.query;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    themoviedbId: movieId,
    title: title,
    description: null,
    rating: null,
    image: poster_path,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    // if (!form.description) {
    //   err.description = "Description is required";
    // }

    return err;
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
      router.push('/my_movies');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createMovie();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  if (!isFound) {
    return <div>not found</div>;
  }

  return (
    <Page title="login">
      <PageContainer>
        {router.back && (
          <Breadcrumb style={{ marginBottom: 24 }} size={'huge'}>
            <Breadcrumb.Divider icon="left chevron" />
            <Breadcrumb.Section
              onClick={(e) => {
                e.preventDefault;

                return router.back();
              }}
              link
            >
              back
            </Breadcrumb.Section>
          </Breadcrumb>
        )}

        <ContentContainer
          imageUrl={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`}
        >
          <SubContainer>
            <Left>
              <img
                style={{ borderRadius: 16 }}
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

                <Label
                  style={{ float: 'right', marginTop: 8 }}
                  circular
                  color={getColorFromMark(vote_average)}
                >
                  {vote_average}
                </Label>
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

              <hr />

              <Text isBold marginTop={84} marginBottom={16} fontSize={22} textColor="#ffffff">
                Save it in your list
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

              <Form onSubmit={handleSubmit}>
                <Form.TextArea
                  placeholder="Write a personnal note for this movie"
                  name="description"
                  value={form.description || ''}
                  onChange={handleChangeDescription}
                  style={{ width: 600 }}
                />

                <Button color="green" style={{ marginTop: 10 }}>
                  Ajouter
                </Button>
              </Form>
            </Right>
          </SubContainer>
        </ContentContainer>
      </PageContainer>
    </Page>
  );
};

View.getInitialProps = async (context) => {
  const { query: { movieId } = {} } = context;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=fr`,
  );

  const data = await res.json();

  console.log('data', data);
  return {
    movie: data,
    isFound: data.success !== false,
    namespacesRequired: ['common'],
  };
};

export default View;
