import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Label, Button, Select, Pagination } from 'semantic-ui-react';
import { withTranslation } from 'i18n';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardMovie from 'components/CardMovie';
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
  background-color: #f5f5f5;
  width: 280px;
  border: 1px solid rgb(224, 230, 233);
  border-radius: 10px;
  padding: 16px 16px 16px 16px;
  top: 90px;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
  @media (min-width: 768px) {
    position: sticky;
    margin-right: 16px;

  }
}`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
  position: relative;
`;

const Movies = (props) => {
  const { t } = props;

  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const [filter, setFilter] = useState('discover');
  // // const [sortBy, setSortBy] = useState('popularity.desc');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();
  const [genres, setGenres] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=fr`,
        );
        const { genres } = await request.json();

        setGenres(genres);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(async () => {
    let query = null;
    let endPoint = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePage,
      language: 'fr',
    };

    if (selectedGenres.length) {
      obj.with_genres = selectedGenres;
    }

    if (yearStart && yearEnd) {
      obj['release_date.gte'] = `${yearStart}-01-01`;
      obj['release_date.lte'] = `${yearEnd}-01-01`;
    }

    if (filter === 'discover') {
      endPoint = 'discover/movie';
    }

    if (filter === 'top_rated') {
      endPoint = 'movie/top_rated';
    }
    if (filter === 'upcoming') {
      endPoint = 'movie/upcoming';
    }

    query = `https://api.themoviedb.org/3/${endPoint}?${objectToQueryString(obj)}`;

    const res = await fetch(query);

    const { results, total_pages } = await res.json();
    setMovies(results);
    setTotalPages(total_pages);
    // }
  }, [activePage, filter, yearStart, yearEnd, selectedGenres]);

  const handleClickGenre = useCallback(
    (genreId) => {
      const selectedIndex = selectedGenres.indexOf(genreId);

      let newGenres = [...selectedGenres];

      if (selectedIndex === -1) {
        newGenres.push(genreId);
      } else {
        newGenres.splice(selectedIndex, 1);
      }

      console.log('newGenres', newGenres);
      setSelectedGenres(newGenres);
    },
    [selectedGenres],
  );

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
    <Page
      title="Movies - PapyMovie"
      description="Discover the popular or best rated movies as well as the ones coming soon"
      url="/movies"
    >
      <PageContainer maxWidth="1300">
        <Row justifyContent="space-between">
          <Text isBold marginBottom={24} fontSize={32}>
            {t('movies')}
          </Text>
          {isMobile && (
            <Button
              primary
              style={{ height: '40px' }}
              icon="options"
              onClick={handleClickFilters}
            />
          )}
        </Row>

        <Row flexDirection={isMobile ? 'column' : 'row'}>
          {(!isMobile || (isMobile && isFiltersVisible)) && (
            <RightColumn>
              <Text isBold fontSize={16} marginBottom={16}>
                {t('filters')}
              </Text>

              <Text marginBottom={4}>{t('sort_by')}</Text>
              <Select
                fluid
                style={{ marginBottom: 32 }}
                onChange={handleChangeFilter}
                placeholder={t('sort_by')}
                options={filters}
                value={filter}
              />

              <Text marginBottom={8}>Genres</Text>
              <div style={{ marginBottom: 16 }}>
                {genres &&
                  genres.map((genre) => {
                    return (
                      <Label
                        onClick={() => {
                          handleClickGenre(genre.id);
                        }}
                        key={genre.id}
                        style={{ marginBottom: 6, cursor: 'pointer' }}
                        color={selectedGenres.includes(genre.id) ? 'blue' : 'grey'}
                      >
                        {genre.name}
                      </Label>
                    );
                  })}
              </div>

              <Row flexDirection="row">
                <div style={{ marginRight: 12, width: '100%' }}>
                  <Text marginBottom={4}>{t('between')}</Text>
                  <Select
                    fluid
                    style={{ marginBottom: 32, width: isMobile ? '100%' : '92px' }}
                    onChange={handleChangeYearStart}
                    placeholder={t('all')}
                    options={yearsOptions}
                    value={yearStart || null}
                  />
                </div>
                <div style={{ width: '100%' }}>
                  <Text marginBottom={4}>{t('and')}</Text>

                  <Select
                    fluid
                    style={{ width: isMobile ? '100%' : '92px' }}
                    onChange={handleChangeYearEnd}
                    placeholder={t('all')}
                    options={yearsOptions}
                    value={yearEnd || null}
                  />
                </div>
              </Row>
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
                      height={isMobile ? 270 : 400}
                      percent={isMobile || isTablet ? 50 : 25}
                    >
                      <CardMovie
                        isMobile={isMobile}
                        title={title}
                        subtitle={moment(release_date).format('MMM, YYYY')}
                        imageUrl={`https://image.tmdb.org/t/p/w${
                          isMobile ? 200 : 300
                        }/${poster_path}`}
                        href={`/movies/${id}`}
                        grade={vote_average}
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
    namespacesRequired: ['movie'],
  };
};

export default withTranslation('movie')(Movies);
