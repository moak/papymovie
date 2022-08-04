import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Label, Button, Select } from 'semantic-ui-react';
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

const MediaList = (props) => {
  const { mediaType = 'movie', t, locale, theme, toggleTheme } = props;

  const [isLoading, setIsLoading] = useState(false);

  const urls = {
    movie: {
      name: 'movie',
      title: t('movies'),
      discover: `https://api.themoviedb.org/3/movie/popular`,
      top_rated: `https://api.themoviedb.org/3/movie/top_rated`,
      upcoming: `https://api.themoviedb.org/3/movie/upcoming`,
      genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${locale}`,
      filters: [
        { key: 'discover', value: 'discover', text: t('popular') },
        { key: 'top_rated', value: 'top_rated', text: t('top_rated') },
        { key: 'upcoming', value: 'upcoming', text: t('coming_soon') },
      ],
    },
    serie: {
      // filters: [
      //   { key: 'discover', value: 'discover', text: 'Popular' },
      //   { key: 'top_rated', value: 'top_rated', text: 'Top rated' },
      // ],
      name: 'serie',
      title: t('series'),
      discover: `https://api.themoviedb.org/3/tv/popular`,
      top_rated: `https://api.themoviedb.org/3/tv/top_rated`,
      genres: `https://api.themoviedb.org/3/genre/tv/list?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&language=${locale}`,
    },
  };

  const [medias, setMedias] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const [filter, setFilter] = useState('discover');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [genres, setGenres] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [yearStart, setYearStart] = useState();
  const [yearEnd, setYearEnd] = useState();

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const yearsOptions = [{ key: 'all', value: undefined, text: 'all' }];

  for (let i = 2022; i >= 1850; i--) {
    yearsOptions.push({ key: i, value: i, text: i });
  }

  useEffect(() => {
    const fetchGenresMedias = async () => {
      try {
        const request = await fetch(urls[mediaType].genres);
        const { genres } = await request.json();

        setGenres(genres);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchGenresMedias();
  }, [locale]);

  const processMedias = async (fetchMore, activePage) => {
    setIsLoading(true);
    let query = null;

    const obj = {
      api_key: process.env.THEMOVIEDB_API_KEY,
      page: activePage,
      language: locale,
    };

    if (selectedGenres.length) {
      obj.with_genres = selectedGenres;
    }

    if (yearStart && yearEnd) {
      obj['release_date.gte'] = `${yearStart}-01-01`;
      obj['release_date.lte'] = `${yearEnd}-01-01`;
    }

    query = `${urls[mediaType][filter]}?${objectToQueryString(obj)}`;

    const res = await fetch(query);

    const { results, total_pages } = await res.json();

    if (fetchMore) {
      setMedias((medias) => [...(medias || []), ...results]);
    } else {
      setMedias(results);
    }

    setTotalPages(total_pages);
    setIsLoading(false);
  };

  const handleLoadMore = useCallback(
    (activePage) => {
      setActivePage(activePage + 1);
      processMedias(true, activePage);
    },
    [activePage],
  );

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    setActivePage(1);
    setMedias([]);
    processMedias(false, 1);
  }, [selectedGenres, filter, yearStart, yearEnd]);

  useEffect(() => {
    processMedias(false, 1);
  }, []);

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

  return (
    <Page
      title={`${urls[mediaType].title} - Thingsyouwatch`}
      description="Discover the popular or best rated movies as well as the ones coming soon"
      url="/movies"
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer background={theme.background} maxWidth="1300">
        <Row justifyContent="space-between">
          <Text textColor={theme.text} isBold marginBottom={24} fontSize={26}>
            {urls[mediaType].title}
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
              {urls[mediaType].filters ? (
                <>
                  <Text isBold textColor={theme.text} marginBottom={8}>
                    {t('sort_by')}
                  </Text>
                  <Select
                    fluid
                    style={{ marginBottom: 32 }}
                    onChange={handleChangeFilter}
                    placeholder={t('sort_by')}
                    options={urls[mediaType].filters}
                    value={filter}
                  />
                </>
              ) : null}

              <Text isBold textColor={theme.text} marginBottom={8}>
                Genres
              </Text>
              <div style={{ marginBottom: 16 }}>
                {genres?.map((genre) => {
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

              {/* {urls[mediaType].name === 'movie' ? (
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
              ) : null} */}
            </RightColumn>
          )}
          <LeftColumn percent={80} isMobile>
            <div style={{ width: '100%' }}>
              <InfiniteScroll
                dataLength={medias?.length || 0}
                next={() => handleLoadMore(activePage)}
                hasMore={!isLoading && activePage < totalPages}
                loader={<h3> Loading...</h3>}
              >
                {medias?.length ? (
                  <List>
                    {medias
                      .filter((value, index, self) => {
                        return self.findIndex((v) => v.id === value.id) === index;
                      })
                      .map((media) => {
                        const { id, title, name, poster_path, vote_average, release_date } = media;

                        return (
                          <CardContainer key={id} percent={isMobile ? 50 : isTablet ? 33 : 25}>
                            <CardMovie
                              isMobile={isMobile}
                              title={title || name}
                              subtitle={moment(release_date).format('MMM, YYYY')}
                              imageUrl={`https://image.tmdb.org/t/p/w${
                                isMobile ? 200 : 300
                              }/${poster_path}`}
                              href={`/medias/${id}?type=${
                                urls[mediaType].name === 'movie' ? 'movie' : 'serie'
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
            </div>
          </LeftColumn>
        </Row>
      </PageContainer>
    </Page>
  );
};

export default MediaList;
