import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';
import User from 'models/User';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardFeed from 'components/CardFeed';
import CardFeedUser from 'components/CardFeedUser';

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
  order: ${(p) => p.order};
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
`;

const Community = (props) => {
  const { feed, toggleTheme, theme, topUsers, trendingUsers } = props;

  const [seeAllTopUsers, setSeeAllTopUsers] = useState(false);

  const { t } = useTranslation('community');
  const isMobile = useIsMobile();

  return (
    <Page
      title={`${t('view.title')} - Thingsyouwatch`}
      description={t('view.description')}
      url="/community"
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <PageContainer maxWidth={1024}>
        <Row flexDirection={isMobile ? 'column' : 'row'}>
          <div style={{ order: isMobile ? 2 : 1 }}>
            <Text textColor={theme.text} isBold marginBottom={24} fontSize={26}>
              {t('view.title')}
            </Text>
            <div style={{ marginRight: 20 }}>
              {feed
                .filter((item) => item.movie && item.user)
                .map((feedItem) => {
                  return (
                    <div style={{ marginBottom: 16 }} key={feedItem._id}>
                      <CardFeed t={t} theme={theme} isMobile={isMobile} feedItem={feedItem} />
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            style={{ order: isMobile ? 1 : 2, width: isMobile ? '100%' : 250, marginBottom: 20 }}
          >
            <div>
              <Text textColor={theme.text} isBold marginBottom={12} fontSize={isMobile ? 26 : 18}>
                {t('view.top_user')}
              </Text>

              {topUsers?.slice(0, seeAllTopUsers || !isMobile ? 3 : 2).map((user) => {
                return (
                  <div
                    key={user._id}
                    style={{ width: isMobile ? '100%' : 250, height: 70, marginBottom: 12 }}
                  >
                    <CardFeedUser
                      isAnimated
                      theme={theme}
                      isMobile={isMobile}
                      name={user.name}
                      updatedAt={user.updated_at}
                      imageUrl={user.image}
                      href={`/users/${user._id}`}
                      infos={[{ amount: user.movies.length, title: t('media') }]}
                    />
                  </div>
                );
              })}
              {isMobile && topUsers?.length > 3 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon
                    onClick={() => {
                      setSeeAllTopUsers(!seeAllTopUsers);
                    }}
                    name={`chevron ${seeAllTopUsers ? 'up' : 'down'}`}
                  />
                </div>
              ) : null}
            </div>

            <div>
              <Text
                textColor={theme.text}
                isBold
                marginBottom={12}
                marginTop={24}
                fontSize={isMobile ? 26 : 18}
              >
                {t('view.recent_user')}
              </Text>

              {trendingUsers?.slice(0, 2).map((user) => {
                return (
                  <div
                    key={user._id}
                    style={{ width: isMobile ? '100%' : 250, height: 70, marginBottom: 12 }}
                  >
                    <CardFeedUser
                      isAnimated
                      theme={theme}
                      isMobile={isMobile}
                      name={user.name}
                      updatedAt={user.updated_at}
                      imageUrl={user.image}
                      href={`/users/${user._id}`}
                      infos={[{ amount: user.movies.length, title: t('media') }]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Row>
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  await dbConnect();

  const feed = await Feed.find()
    .populate('movie')
    .populate('user')
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
      ],
    });

  const users = await User.find();

  let topUsers = users.sort((a, b) => a.movies.length - b.movies.length);
  let trendingUsers = users
    .filter((item) => item.updated_at)
    .sort((a, b) => a.updated_at - b.updated_at);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'community'])),
      feed: JSON.parse(JSON.stringify(feed.reverse())),
      topUsers: JSON.parse(JSON.stringify(topUsers.reverse())),
      trendingUsers: JSON.parse(JSON.stringify(trendingUsers.reverse())),
    },
  };
}

// export default Community;
export default dynamic(() => Promise.resolve(Community), { ssr: false });
