import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Pagination, Loader } from 'semantic-ui-react';

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
  const router = useRouter();

  const [movies, setMovies] = useState(null);
  const [totalPagesMovies, setTotalPagesMovies] = useState(0);
  const [activePageMovies, setActivePageMovies] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [series, setSeries] = useState(null);
  const [totalPagesSeries, setTotalPagesSeries] = useState(0);
  const [activePageSeries, setActivePageSeries] = useState(1);

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(async () => {
    if (router.query.search) {
      setIsLoading(true);
      const moviesQuery = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&query=${router.query.search}&page=${activePageMovies}&language=fr`,
      );

      const { results: moviesResults, total_pages: moviesTotalPage } = await moviesQuery.json();

      const seriesQuery = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&query=${router.query.search}&page=${activePageSeries}&language=fr`,
      );

      const { results: seriesResults, total_pages: seriesTotalPage } = await seriesQuery.json();

      setIsLoading(false);
      setMovies(moviesResults);
      setSeries(seriesResults);
      setTotalPagesMovies(moviesTotalPage);
      setTotalPagesSeries(seriesTotalPage);
    }
  }, [router, activePageMovies]);

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
      } PapyMovie`}
      url="/search"
    >
      <PageContainer>
        {isLoading ? (
          <Loader active inline="centered" size="large" />
        ) : (
          <>
            <Text isBold marginBottom={24} fontSize={32}>
              Movies:
            </Text>
            {movies && movies.length === 0 && series && series.length === 0 ? (
              <EmptyState>No results found for {router.query.search}.</EmptyState>
            ) : (
              <>
                {movies && (
                  <List>
                    {movies.map((movie) => {
                      const { id, title, poster_path, release_date, vote_average } = movie;

                      return (
                        <CardContainer
                          key={id}
                          height={isMobile ? 260 : 400}
                          percent={isMobile || isTablet ? 50 : 20}
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
            <Text isBold marginTop={24} marginBottom={24} fontSize={32}>
              Series:
            </Text>
            {series && series.length === 0 ? (
              <EmptyState>No results found for {router.query.search}.</EmptyState>
            ) : (
              <>
                {series && (
                  <List>
                    {series.map((serie) => {
                      const { id, name, poster_path, first_air_date, vote_average } = serie;

                      return (
                        <CardContainer key={id} percent={isMobile ? 100 : isTablet ? 50 : 25}>
                          <CardMovie
                            title={name}
                            subtitle={moment(first_air_date).format('MMM, YYYY')}
                            imageUrl={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                            href={null}
                            grade={vote_average}
                          />
                        </CardContainer>
                      );
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

New.getInitialProps = async () => {
  return { namespacesRequired: ['common'] };
};

export default New;
