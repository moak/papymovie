import React from 'react';
import styled from 'styled-components';

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
    <Page title="Feed | GoldMovies">
      <PageContainer maxWidth={1024}>
        <Row justifyContent="space-between">
          <Text marginBottom={24} fontSize={32}>
            Feed
          </Text>
        </Row>
        {feed.map((feedItem) => {
          return (
            <div style={{ marginBottom: 16 }} key={feedItem._id}>
              <CardFeed isMobile={isMobile} feedItem={feedItem} />
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
