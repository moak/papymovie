import React, { useState, useEffect } from 'react';

import Link from 'next/link';
// import fetch from "isomorphic-unfetch";
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import { useRouter } from 'next/router';

import { Pagination, Label, Card, Grid, Button, Form, Loader } from 'semantic-ui-react';

import useIsMobile from '../hooks/useIsMobile';

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
  width: ${(p) => p.percent}%;
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
        {movies && (
          <List>
            {movies.map((movie) => {
              const { id, title, description, poster_path, vote_average } = movie;

              return (
                <CardContainer key={id} percent={isMobile ? 100 : 25}>
                  <Card
                    style={{ width: '100%' }}
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
              ellipsisItem={null}
            />
          </PaginationContainer>
        )}
      </PageContainer>
    </Page>
  );
};

New.getInitialProps = async () => {
  return { namespacesRequired: ['common'] };
};

export default New;
