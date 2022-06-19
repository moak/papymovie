import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardFeed from 'components/CardFeed';

import useIsMobile from 'hooks/useIsMobile';

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

const Community = (props) => {
  const { feed } = props;
  const { t } = useTranslation('community');

  const isMobile = useIsMobile();

  return (
    <Page
      title="Community - PapyMovie"
      description="Check out the recents movies added by the users"
      url="/community"
    >
      <PageContainer maxWidth={1024}>
        <Row justifyContent="space-between">
          <Text isBold marginBottom={24} fontSize={32}>
            {t('community:title')}
          </Text>
        </Row>
        {feed
          .filter((item) => item.movie && item.user)
          .map((feedItem) => {
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

export async function getServerSideProps(context) {
  const { locale } = context;

  await dbConnect();

  const feed = await Feed.find({ user: { $exists: true }, movie: { $exists: true } })
    .populate('movie')
    .populate('user');

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'community'])),
      feed: JSON.parse(JSON.stringify(feed.reverse())),
    },
  };
}

export default Community;
