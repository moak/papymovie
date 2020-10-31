import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Feed, Button, Select, Pagination } from 'semantic-ui-react';

import Page from '../components/Page';
import PageContainer from '../components/PageContainer';
import Text from '../components/Text';
import CardMovie from '../components/CardMovie';

import useIsMobile from '../hooks/useIsMobile';
import useIsTablet from '../hooks/useIsTablet';

import { objectToQueryString } from '../utils/queryString';

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

const Image = styled.img`
  height: 300px;
}`;
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
  margin-left: 16px;
`;

const RightColumn = styled.div`
  background-color: #ffffff;
  width: 250px;
  border: 1px solid rgb(224, 230, 233);
  border-radius: 10px;
  padding: 16px 16px 0px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
}`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
`;

const Discover = (props) => {
  const { feed } = props;

  // const [movies, setMovies] = useState(null);

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
