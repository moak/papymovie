import React, { useState, useEffect } from 'react';

import Link from 'next/link';
// import fetch from "isomorphic-unfetch";
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import { useRouter } from 'next/router';

import { Select, Pagination, Label, Card, Grid, Button, Form, Loader } from 'semantic-ui-react';

import Page from '../components/Page';
import PageContainer from '../components/PageContainer';
import Text from '../components/Text';
import getColorFromMark from '../utils/getColorFromMark';

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
const PaginationContainer = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
}`;

const Discover = (props) => {
  // const { movies } = props;
  const router = useRouter();

  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilter] = useState('popularity.desc');
  const [year, setYear] = useState('all');

  const filterOptions = [
    { key: 'popularity.desc', value: 'popularity.desc', text: 'Popularity' },
    { key: 'vote_count.desc', value: 'vote_count.desc', text: 'Vote count' },
  ];
  const yearOptions = [
    { key: 'all', value: 'all', text: 'all' },
    { key: '2020', value: '2020', text: '2020' },
    { key: '2019', value: '2019', text: '2019' },
    { key: '2000', value: '2000', text: '2000' },
    { key: '1980', value: '1980', text: '1980' },
  ];

  useEffect(async () => {
    // if (router.query.search) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&page=${activePage}&sort_by=${filter}&year=${year}&language=fr`,
    );

    // if (year) {
    //   router.push(`/discover?year=${year}&year=${year}`, undefined, {
    //     shallow: true,
    //   });
    // }

    const { results, total_pages } = await res.json();
    setMovies(results);
    setTotalPages(total_pages);
    // }
  }, [activePage, filter, year]);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  const handleChangeFilter = (e, data) => {
    setFilter(data.value);
  };
  const handleChangeYear = (e, data) => {
    setYear(data.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <Page title="login">
      <PageContainer>
        <Select
          style={{ marginBottom: 32 }}
          onChange={handleChangeFilter}
          placeholder="Filter by"
          options={filterOptions}
          value={filter}
        />
        <Select
          style={{ marginBottom: 32 }}
          onChange={handleChangeYear}
          placeholder="Year"
          options={yearOptions}
          value={year || null}
        />

        {movies && (
          <List>
            {movies.map((movie) => {
              const { id, title, description, poster_path, vote_average } = movie;

              return (
                <CardContainer key={id}>
                  <Card
                    onClick={(e) => {
                      e.preventDefault;
                      router.push(`/movies/${id}`);
                    }}
                  >
                    <Card.Content>
                      <Card.Header>
                        <div>
                          <Text isBold fontSize={16}>
                            {title}
                            <Label
                              style={{ marginLeft: 8, float: 'right' }}
                              circular
                              color={getColorFromMark(vote_average)}
                            >
                              {vote_average}
                            </Label>
                          </Text>
                        </div>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <div style={{ marginBottom: 10 }}>{description}</div>
                      <Image width="100%" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
                    </Card.Content>
                  </Card>
                </CardContainer>
              );
            })}
          </List>
        )}

        {totalPages > 0 && (
          <PaginationContainer>
            <Pagination
              activePage={activePage}
              onPageChange={handlePaginationChange}
              totalPages={totalPages}
            />
          </PaginationContainer>
        )}
      </PageContainer>
    </Page>
  );
};

Discover.getInitialProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=fr`,
  );

  const data = await res.json();

  console.log('data', data);
  return {
    movie: data,
    isFound: data.success !== false,
    namespacesRequired: ['common'],
  };
};

export default Discover;
