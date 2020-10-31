import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Select, Pagination } from 'semantic-ui-react';

import Page from '../components/Page';
import PageContainer from '../components/PageContainer';
import Text from '../components/Text';
import Card from '../components/Card';

import useIsMobile from '../hooks/useIsMobile';

import { objectToQueryString } from '../utils/queryString';

const List = styled.div`
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}`;

const CardContainer = styled.div`
  height: 450px;
  width: ${(p) => p.percent}%;
  display: flex;
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

  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilter] = useState('discover');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();

  const isMobile = useIsMobile();

  const sortByOptions = [
    { key: 'popularity.desc', value: 'popularity.desc', text: 'Popularity' },
    { key: 'vote_count.desc', value: 'vote_count.desc', text: 'Vote count' },
  ];

  const filters = [
    { key: 'discover', value: 'discover', text: 'Popular' },
    { key: 'top_rated', value: 'top_rated', text: 'Top rated' },
    { key: 'upcoming', value: 'upcoming', text: 'Coming soon' },
  ];

  const yearsOptions = [
    { key: 'all', value: undefined, text: 'all' },
    { key: 2020, value: '2020', text: '2020' },
    { key: 2019, value: '2019', text: '2019' },
    { key: 2018, value: '2018', text: '2018' },
  ];

  useEffect(async () => {
    let query = null;
    let endPoint = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePage,
      language: 'fr',
    };

    const test = console.log('test', test);
    if (filter === 'top_rated') {
      endPoint = 'movie/top_rated';
    }
    if (filter === 'upcoming') {
      endPoint = 'movie/upcoming';
    }

    if (filter === 'discover') {
      obj.sortBy = sortBy;

      if (yearStart) {
        obj['release_date.gte'] = `${yearStart}-01-01`;
      }
      if (yearEnd) {
        obj['release_date.lte'] = `${yearEnd}-01-01`;
      }

      endPoint = 'discover/movie';
    }

    query = `https://api.themoviedb.org/3/${endPoint}?${objectToQueryString(obj)}`;

    const res = await fetch(query);

    const { results, total_pages } = await res.json();
    setMovies(results);
    setTotalPages(total_pages);
    // }
  }, [activePage, filter, yearStart, yearEnd]);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  const handleChangeFilter = (e, data) => {
    setFilter(data.value);
  };
  const handleChangeYearStart = (e, data) => {
    setYearStart(data.value);
  };
  const handleChangeYearEnd = (e, data) => {
    setYearEnd(data.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <Page title="login">
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          Discover
        </Text>
        <Select
          style={{ marginBottom: 32 }}
          onChange={handleChangeFilter}
          placeholder="Filter by"
          options={filters}
          value={filter}
        />
        <Select
          style={{ marginBottom: 32 }}
          onChange={handleChangeYearStart}
          placeholder="Year Start"
          options={yearsOptions}
          value={yearStart || null}
        />
        <Select
          style={{ marginBottom: 32 }}
          onChange={handleChangeYearEnd}
          placeholder="Year End"
          options={yearsOptions}
          value={yearEnd || null}
        />

        {movies && (
          <List>
            {movies.map((movie) => {
              const { id, title, poster_path, vote_average, vote_count, release_date } = movie;

              return (
                <CardContainer key={id} percent={isMobile ? 100 : 25}>
                  <Card
                    title={title}
                    subtitle={moment(release_date).format('MMM, YYYY')}
                    imageUrl={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    href={`/movies/${id}`}
                    grade={vote_average}
                    amountVotes={vote_count}
                  />
                </CardContainer>
              );
            })}
          </List>
        )}

        {totalPages > 0 && (
          <PaginationContainer>
            <Pagination
              activePage={activePage}
              ellipsisItem={!isMobile ? undefined : null}
              size="mini"
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
