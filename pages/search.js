import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';

import { Pagination } from 'semantic-ui-react';

import useIsMobile from '../hooks/useIsMobile';

import Page from '../components/Page';
import Card from '../components/Card';
import PageContainer from '../components/PageContainer';
import EmptyState from '../components/EmptyState';
import Text from '../components/Text';

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

const PaginationContainer = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
}`;

const New = () => {
  const router = useRouter();

  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const isMobile = useIsMobile();

  useEffect(async () => {
    if (router.query.search) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c37c9b9896e0233f219e6d0c58f7d8d5&query=${router.query.search}&page=${activePage}&language=fr`,
      );

      const { results, total_pages } = await res.json();
      setMovies(results);
      setTotalPages(total_pages);
    }
  }, [router, activePage]);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <Page title="Search a movie">
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          Results for: {router.query.search}
        </Text>
        {movies && movies.length === 0 ? (
          <EmptyState>No results found</EmptyState>
        ) : (
          <>
            {movies && (
              <List>
                {movies.map((movie) => {
                  const { id, title, poster_path, release_date, vote_average } = movie;

                  console.log('movie', movie);
                  return (
                    <CardContainer key={id} percent={isMobile ? 100 : 25}>
                      <Card
                        title={title}
                        subtitle={moment(release_date).format('MMM, YYYY')}
                        imageUrl={`https://image.tmdb.org/t/p/w500/${poster_path}`}
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
                  onPageChange={handlePaginationChange}
                  totalPages={totalPages}
                  ellipsisItem={null}
                />
              </PaginationContainer>
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
