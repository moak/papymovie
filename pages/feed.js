import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardFeed from 'components/CardFeed';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
`;

const Feed = (props) => {
  const { feed } = props;

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <Page title="login">
      <PageContainer>
        <h1>UNDER CONSTRUCTION</h1>

        <Row justifyContent="space-between">
          <Text marginBottom={24} fontSize={32}>
            Feed
          </Text>
        </Row>
        {feed.map((feedItem) => {
          console.log('feedItem', feedItem);
          return (
            <div style={{ marginBottom: 8 }} key={feedItem._id}>
              <CardFeed
                date={moment(feedItem.created_at).fromNow()}
                userImage={feedItem.user.image}
                movieImage={
                  feedItem.movie ? `https://image.tmdb.org/t/p/w500/${feedItem.movie.image}` : null
                }
                rating={feedItem.movie ? feedItem.movie.rating : null}
                movieTitle={feedItem.movie ? feedItem.movie.title : null}
                name={feedItem.user && feedItem.user.name}
              />
            </div>
          );
        })}
      </PageContainer>
    </Page>
  );
};

Feed.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/feed`);

  const { data } = await res.json();

  return {
    feed: data,
    namespacesRequired: ['common'],
  };
};

export default Feed;
