import React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import FeedItem from 'components/FeedItem';

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

const Discover = (props) => {
  const { feed } = props;

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <Page title="login">
      <PageContainer>
        <Row justifyContent="space-between">
          <Text marginBottom={24} fontSize={32}>
            Feed
          </Text>
        </Row>
        {feed.map((feedItem) => {
          return (
            <div style={{ marginBottom: 8 }} key={feedItem._id}>
              {JSON.stringify(feedItem)}
              <FeedItem />
            </div>
          );
        })}
      </PageContainer>
    </Page>
  );
};

Discover.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/feed`);

  const { data } = await res.json();

  return {
    feed: data,
    namespacesRequired: ['common'],
  };
};

export default Discover;
