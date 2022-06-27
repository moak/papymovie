import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Label, Button, Select } from 'semantic-ui-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardMovie from 'components/CardMovie';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

import { objectToQueryString } from 'utils/queryString';

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: ${(p) => (p.isMobile ? 0 : 16)};
`;

const RightColumn = styled.div`
  background-color: ${(p) => p.background || '#f5f5f5'};
  width: 280px;
  border: 1px solid ${(p) => p.borderColor || '#f5f5f5'};
  border-radius: 10px;
  padding: 16px 16px 16px 16px;
  top: 170px;
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
  const { theme, toggleTheme } = props;

  const { t } = useTranslation('movie');

  const router = useRouter();
  const [selectedMedia, setSelectedMedia] = useState(router.query.type);

  const [movies, setMovies] = useState(null);
  const [totalPagesMovies, setTotalPagesMovies] = useState(null);
  const [activePageMovies, setActivePageMovies] = useState(1);

  const [series, setSeries] = useState(null);
  const [totalPagesSeries, setTotalPagesSeries] = useState(null);
  const [activePageSeries, setActivePageSeries] = useState(1);

  const [filter, setFilter] = useState('discover');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();
  const [genresMovies, setGenresMovies] = useState(null);
  const [genresSeries, setGenresSeries] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const scrollRef = useRef(null);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const filters = [
    { key: 'discover', value: 'discover', text: 'Popular' },
    { key: 'top_rated', value: 'top_rated', text: 'Top rated' },
    { key: 'upcoming', value: 'upcoming', text: 'Coming soon' },
  ];

  const yearsOptions = [{ key: 'all', value: undefined, text: 'all' }];

  for (let i = 2022; i >= 1850; i--) {
    yearsOptions.push({ key: i, value: i, text: i });
  }

  useEffect(() => {
    setSelectedMedia(router.query.type);
  }, [router.query]);

  useEffect(() => {
    const fetchGenresMovies = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${router.locale}`,
        );
        const { genres } = await request.json();

        setGenresMovies(genres);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchGenresMovies();
  }, [router.locale]);

  useEffect(() => {
    const fetchGenresSeries = async () => {
      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${router.locale}`,
        );
        const { genres } = await request.json();

        setGenresSeries(genres);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchGenresSeries();
  }, [router.locale]);

  const processMovies = async (shouldReset) => {
    let query = null;
    let endPoint = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePageMovies,
      language: router.locale,
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

    if (!shouldReset) {
      setActivePageMovies((activePageMovies) => activePageMovies + 1);

      setMovies((movies) => [...(movies || []), ...results]);
    } else {
      setMovies(results);
    }

    setTotalPagesMovies(total_pages);
  };

  const processSeries = async (shouldReset) => {
    let query = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePageSeries,
      language: router.locale,
    };

    if (selectedGenres.length) {
      obj.with_genres = selectedGenres;
    }

    if (yearStart && yearEnd) {
      obj['release_date.gte'] = `${yearStart}-01-01`;
      obj['release_date.lte'] = `${yearEnd}-01-01`;
    }

    query = `https://api.themoviedb.org/3/discover/tv?${objectToQueryString(obj)}`;

    const res = await fetch(query);

    const { results, total_pages } = await res.json();

    if (!shouldReset) {
      setActivePageSeries((activePageSeries) => activePageSeries + 1);

      setSeries((series) => [...(series || []), ...results]);
    } else {
      setSeries(results);
    }
    setTotalPagesSeries(total_pages);
  };

  useEffect(() => {
    if (selectedGenres.length) {
      setSelectedGenres([]);
    }
  }, [router.query]);

  useEffect(() => {
    processSeries(false);
    processMovies(false);
  }, []);

  useEffect(() => {
    setActivePageMovies(1);
    setActivePageSeries(1);

    processSeries(true);
    processMovies(true);
  }, [selectedGenres]);

  const handleClickGenre = useCallback(
    (genreId) => {
      const selectedIndex = selectedGenres.indexOf(genreId);

      let newGenres = [...selectedGenres];

      if (selectedIndex === -1) {
        newGenres.push(genreId);
      } else {
        newGenres.splice(selectedIndex, 1);
      }

      setSelectedGenres(newGenres);
    },
    [selectedGenres],
  );

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

  const medias = selectedMedia === 'movie' ? movies : series;
  const genres = selectedMedia === 'movie' ? genresMovies : genresSeries;

  return (
    <Page
      title="Movies - PapyMovie"
      description="Discover the popular or best rated movies as well as the ones coming soon"
      url="/movies"
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer background={theme.background} maxWidth="1300">
        <Row justifyContent="space-between">
          <Text textColor={theme.text} isBold marginBottom={24} fontSize={26}>
            {selectedMedia === 'movie' ? t('movies') : t('series')}
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
            <RightColumn background={theme.background} borderColor={theme.borderColor}>
              {selectedMedia === 'movie' ? (
                <>
                  <Text textColor={theme.text} isBold fontSize={16} marginBottom={16}>
                    {t('filters')}
                  </Text>
                  <Text textColor={theme.text} marginBottom={4}>
                    {t('sort_by')}
                  </Text>
                  <Select
                    fluid
                    style={{ marginBottom: 32 }}
                    onChange={handleChangeFilter}
                    placeholder={t('sort_by')}
                    options={filters}
                    value={filter}
                  />
                </>
              ) : null}

              <Text textColor={theme.text} marginBottom={8}>
                Genres
              </Text>
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

              {selectedMedia === 'movie' ? (
                <>
                  <Row flexDirection="row">
                    <div style={{ marginRight: 12, width: '100%' }}>
                      <Text textColor={theme.text} marginBottom={4}>
                        {t('between')}
                      </Text>
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
                      <Text textColor={theme.text} marginBottom={4}>
                        {t('and')}
                      </Text>

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
                </>
              ) : null}
            </RightColumn>
          )}
          <LeftColumn percent={80} isMobile>
            <>
              {medias?.length ? (
                <InfiniteScroll
                  dataLength={medias.length}
                  next={
                    selectedMedia === 'movie'
                      ? () => processMovies(false)
                      : () => processSeries(false)
                  }
                  hasMore={
                    selectedMedia === 'movies'
                      ? activePageMovies < totalPagesMovies
                      : activePageSeries < totalPagesSeries
                  }
                  loader={<h3> Loading...</h3>}
                  endMessage={<h4>Nothing more to show</h4>}
                >
                  {medias?.length ? (
                    <List ref={scrollRef}>
                      {medias
                        .filter((value, index, self) => {
                          return self.findIndex((v) => v.id === value.id) === index;
                        })
                        .map((media) => {
                          const { id, title, name, poster_path, vote_average, release_date } =
                            media;

                          return (
                            <CardContainer key={id} percent={isMobile ? 50 : isTablet ? 33 : 25}>
                              <CardMovie
                                isMobile={isMobile}
                                title={title || name}
                                subtitle={moment(release_date).format('MMM, YYYY')}
                                imageUrl={`https://image.tmdb.org/t/p/w${
                                  isMobile ? 200 : 300
                                }/${poster_path}`}
                                href={`/movies/${id}?type=${
                                  selectedMedia === 'movie' ? 'movie' : 'serie'
                                }`}
                                grade={vote_average}
                                height={isMobile ? '230px' : '340px'}
                                theme={theme}
                              />
                            </CardContainer>
                          );
                        })}
                    </List>
                  ) : null}
                </InfiniteScroll>
              ) : null}

              {/* {totalPagesMovies > 0 && (
                <PaginationContainer>
                  <Pagination
                    activePageMovies={activePageMovies}
                    ellipsisItem={!isMobile ? undefined : null}
                    prevItem={isMobile ? false : undefined}
                    nextItem={isMobile ? false : undefined}
                    size="mini"
                    onPageChange={handlePaginationChange}
                    totalPages={totalPagesMovies}
                  />
                </PaginationContainer>
              )} */}
            </>
          </LeftColumn>
        </Row>
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'movie'])),
    },
  };
}

// export default Movies;
export default dynamic(() => Promise.resolve(Movies), { ssr: false });
