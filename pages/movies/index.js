import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Button, Select, Pagination } from 'semantic-ui-react';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardMovie from 'components/CardMovie';
import RoundedLabel from 'components/RoundedLabel';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

import { objectToQueryString } from 'utils/queryString';

const PaginationContainer = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
}`;

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: ${(p) => (p.isMobile ? 0 : 16)};
`;

const RightColumn = styled.div`
  background-color: #ffffff;
  width: 250px;
  border: 1px solid rgb(224, 230, 233);
  border-radius: 10px;
  padding: 16px 16px 0px;
  top: 90px;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
  @media (min-width: 768px) {
    position: sticky;

  }
}`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
  position: relative;
`;

const Movies = () => {
  const ref = useRef(null);
  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const [filter, setFilter] = useState('discover');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const sortByOptions = [
    { key: 'popularity.desc', value: 'popularity.desc', text: 'Popularity' },
    { key: 'vote_count.desc', value: 'vote_count.desc', text: 'Vote count' },
  ];

  const filters = [
    { key: 'discover', value: 'discover', text: 'Popular' },
    { key: 'top_rated', value: 'top_rated', text: 'Top rated' },
    { key: 'upcoming', value: 'upcoming', text: 'Coming soon' },
  ];

  const yearsOptions = [{ key: 'all', value: undefined, text: 'all' }];

  for (let i = 2020; i >= 1850; i--) {
    yearsOptions.push({ key: i, value: i, text: i });
  }

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, [activePage]);

  useEffect(async () => {
    let query = null;
    let endPoint = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePage,
      language: 'fr',
    };

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
  const handleClickFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <Page title="login">
      <PageContainer maxWidth="1300">
        <Row justifyContent="space-between">
          <Text marginBottom={24} fontSize={32}>
            Movies
          </Text>
          {isMobile && (
            <Button
              primary
              style={{ height: '40px' }}
              icon="settings"
              onClick={handleClickFilters}
            />
          )}
        </Row>

        <Row flexDirection={isMobile ? 'column' : 'row'} ref={ref}>
          {(!isMobile || (isMobile && isFiltersVisible)) && (
            <RightColumn>
              <Text isBold fontSize={16} marginBottom={16}>
                Filters
              </Text>

              <Text marginBottom={4}>Sort by:</Text>
              <Select
                fluid
                style={{ marginBottom: 32 }}
                onChange={handleChangeFilter}
                placeholder="Filter by"
                options={filters}
                value={filter}
              />

              {filter === 'discover' && (
                <Row flexDirection="row">
                  <div style={{ marginRight: 12, width: '100%' }}>
                    <Text marginBottom={4}>Between</Text>
                    <Select
                      fluid
                      style={{ marginBottom: 32, width: isMobile ? '100%' : '92px' }}
                      onChange={handleChangeYearStart}
                      placeholder="All"
                      options={yearsOptions}
                      value={yearStart || null}
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    <Text marginBottom={4}>And</Text>

                    <Select
                      fluid
                      style={{ marginBottom: 32, width: isMobile ? '100%' : '92px' }}
                      onChange={handleChangeYearEnd}
                      placeholder="All"
                      options={yearsOptions}
                      value={yearEnd || null}
                    />
                  </div>
                </Row>
              )}

              {!isMobile && (
                <>
                  <hr />

                  <Text isBold fontSize={16} marginBottom={16} marginTop={16}>
                    Notes
                  </Text>
                  <div style={{ display: 'flex', marginBottom: 16 }}>
                    <RoundedLabel borderWith={3} rounded color="#21ba45 ">
                      {6}
                    </RoundedLabel>
                    <Text marginLeft={8}>
                      Global rating on <a href="www.themoviedb.org">themoviedb</a>.
                    </Text>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <RoundedLabel width="50px" height="26px" color="#333333">
                      {345}
                    </RoundedLabel>
                    <Text marginLeft={8}>
                      Amount of votes on <a href="www.themoviedb.org">themoviedb</a>.
                    </Text>
                  </div>
                </>
              )}
            </RightColumn>
          )}
          <LeftColumn percent={80} isMobile>
            {movies && (
              <List>
                {movies.map((movie) => {
                  const { id, title, poster_path, vote_average, vote_count, release_date } = movie;

                  return (
                    <CardContainer
                      key={id}
                      height={400}
                      percent={isMobile ? 100 : isTablet ? 50 : 25}
                    >
                      <CardMovie
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
                  prevItem={isMobile ? false : undefined}
                  nextItem={isMobile ? false : undefined}
                  size="mini"
                  onPageChange={handlePaginationChange}
                  totalPages={totalPages}
                />
              </PaginationContainer>
            )}
          </LeftColumn>
        </Row>
      </PageContainer>
    </Page>
  );
};

Movies.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  };
};

export default Movies;
