import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Pagination, Loader } from 'semantic-ui-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

import Page from 'components/Page';
import CardMovie from 'components/CardMovie';
import PageContainer from 'components/PageContainer';
import EmptyState from 'components/EmptyState';
import Text from 'components/Text';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

const PaginationContainer = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
}`;

const New = (props) => {
  const { toggleTheme, theme } = props;

  const [movies, setMovies] = useState(null);
  const [totalPagesMovies, setTotalPagesMovies] = useState(0);
  const [activePageMovies, setActivePageMovies] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [series, setSeries] = useState(null);
  const [activePageSeries, setActivePageSeries] = useState(1);
  const [totalPagesSeries, setTotalPagesSeries] = useState(0);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const router = useRouter();

  useEffect(() => {
    const searchMovie = async () => {
      setIsLoading(true);

      const moviesQuery = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&page=${activePageSeries}&language=${router.locale}&query=${router.query.search}}`,
      );

      const { results: moviesResults, total_pages: moviesTotalPage } = await moviesQuery.json();

      setIsLoading(false);
      setMovies(moviesResults);
      setTotalPagesMovies(moviesTotalPage);
    };

    if (router.query.search) {
      searchMovie();
    }
  }, [router, activePageMovies, router.query.search]);

  useEffect(() => {
    const searchSerie = async () => {
      setIsLoading(true);

      const seriesQuery = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&page=${activePageSeries}&language=${router.locale}&query=${router.query.search}}`,
      );

      const { results: seriesResults, total_pages: seriesTotalPage } = await seriesQuery.json();

      setIsLoading(false);
      setSeries(seriesResults);
      setTotalPagesSeries(seriesTotalPage);
    };

    if (router.query.search) {
      searchSerie();
    }
  }, [router, activePageSeries]);

  const handlePaginationChangeMovies = (e, { activePage }) => {
    setActivePageMovies(activePage);
  };
  const handlePaginationChangeSeries = (e, { activePage }) => {
    setActivePageSeries(activePage);
  };

  return (
    <Page
      title={`Search a movie - ${
        router.query && router.query.search ? `${router.query.search} - ` : ''
      } Thingsyouwatch`}
      url="/search"
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer>
        {isLoading ? (
          <Loader active inline="centered" size="large" />
        ) : router.query.search.length === 0 ? (
          <EmptyState>Search a movie or serie.</EmptyState>
        ) : (
          <>
            <Text textColor={theme.text} isBold marginBottom={24} fontSize={26}>
              Movies for: {router.query.search}
            </Text>
            {movies && movies.length === 0 && series && series.length === 0 ? (
              <EmptyState>No results found for {router.query.search}.</EmptyState>
            ) : (
              <>
                {movies && (
                  <List>
                    {movies.map((movie) => {
                      const { id, title, poster_path, release_date, vote_average } = movie;

                      if (poster_path) {
                        return (
                          <CardContainer key={id} percent={isMobile || isTablet ? 50 : 20}>
                            <CardMovie
                              theme={theme}
                              isMobile={isMobile}
                              title={title}
                              subtitle={moment(release_date).format('MMM, YYYY')}
                              imageUrl={`https://image.tmdb.org/t/p/w${
                                isMobile ? 200 : 300
                              }/${poster_path}`}
                              href={`/medias/${id}?type=movie`}
                              grade={vote_average}
                              height={isMobile ? '230px' : '340px'}
                            />
                          </CardContainer>
                        );
                      }
                    })}
                  </List>
                )}

                {totalPagesMovies > 1 && (
                  <PaginationContainer>
                    <Pagination
                      activePage={activePageMovies}
                      onPageChange={handlePaginationChangeMovies}
                      totalPages={totalPagesMovies}
                      ellipsisItem={!isMobile ? undefined : null}
                      size="mini"
                    />
                  </PaginationContainer>
                )}
              </>
            )}
            <Text textColor={theme.text} isBold marginTop={24} marginBottom={24} fontSize={26}>
              Series for: {router.query.search}
            </Text>
            {series && series.length === 0 ? (
              <EmptyState>No results found for {router.query.search}.</EmptyState>
            ) : (
              <>
                {series && (
                  <List>
                    {series.map((serie) => {
                      const { id, name, poster_path, first_air_date, vote_average } = serie;

                      if (poster_path) {
                        return (
                          <CardContainer key={id} percent={isMobile || isTablet ? 50 : 20}>
                            <CardMovie
                              theme={theme}
                              title={name}
                              subtitle={moment(first_air_date).format('MMM, YYYY')}
                              imageUrl={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                              href={`/medias/${id}?type=serie`}
                              grade={vote_average}
                              height={isMobile ? '230px' : '340px'}
                            />
                          </CardContainer>
                        );
                      }
                    })}
                  </List>
                )}

                {totalPagesSeries > 1 && (
                  <PaginationContainer>
                    <Pagination
                      activePage={activePageSeries}
                      onPageChange={handlePaginationChangeSeries}
                      totalPages={totalPagesSeries}
                      ellipsisItem={!isMobile ? undefined : null}
                      size="mini"
                    />
                  </PaginationContainer>
                )}
              </>
            )}
          </>
        )}
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default New;
