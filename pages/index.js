import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';
import styled from 'styled-components';

import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';

import styles from 'styles/Home.module.css';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import Text from 'components/Text';
import CardContainer from 'components/CardContainer';
import List from 'components/List';
import Box from 'components/Box';
import CardMovie from 'components/CardMovie';

import { withTranslation } from 'i18n';
import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';
// import useScroll from 'hooks/useScroll';

const Description = styled.div`
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}`;

const Container = styled.div`
  height: ${(p) => (p.isMobile ? 500 : 600)}px;
  display: flex;
  background-image: url(./cover.jpeg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;
  justify-content: ${(p) => (p.isMobile ? 'flex-start' : 'center')};
  align-items: center;
  opacity: 0.7;
}`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(p) => (p.isMobile ? 70 : 40)}%;
  margin-top: ${(p) => (p.isMobile ? 110 : 0)}px;
}`;

const Card = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: ${(p) => (p.isMobile ? 0 : 1)}px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${(p) =>
    !p.isMobile &&
    `
    &:hover {
      color: #0070f3;
      border-color: #0070f3;
      cursor: pointer;
    }
  `}
}`;

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(p) => (p.isMobile ? 70 : 80)}%;
  height: 200px;
  margin: 0 auto;
}`;

const Goal2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(p) => (p.isMobile ? 90 : 80)}%;
  padding: 32px 0;
  margin: 0 auto;
  max-width: 1200px;
}`;

const GoalTitle = styled.div`
  letter-spacing: 2px;
  margin-bottom: 0px;
  padding-bottom: 1rem;
  line-height: 1;
  font-size: 1.75rem;
  font-weight: 500;
  text-transform: uppercase;
}`;

const Separator = styled.div`
  width: 50px;
  height: 2px;
  margin-right: auto;
  margin-left: auto;
  margin: 8px 0;
  background-color: red;
}`;

const Home = (props) => {
  const { t, latestMovies } = props;

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <Page title={t('metas.title')} description={t('metas.description')}>
      <Container isMobile={isMobile}>
        <Content isMobile={isMobile}>
          <Text
            isBold
            textAlign="center"
            fontFamily="secondary"
            textColor="#ffffff"
            fontSize={isMobile ? 30 : 46}
            marginBottom={36}
          >
            {t('header.title')}
          </Text>

          <Text textColor="#ffffff" fontSize={18} textAlign="center">
            {t('header.subtitle')}
          </Text>
        </Content>
      </Container>
      <Goal isMobile={isMobile}>
        <GoalTitle textAlign="center"> {t('subheader.title')}</GoalTitle>
        <Separator />
        <Text fontSize={18} textAlign="center">
          {t('subheader.subtitle')}
        </Text>
      </Goal>
      <div
        style={{
          display: 'flex',
          width: isMobile ? '100%' : '70%',
          margin: '0 auto',
          height: isMobile ? '100%' : '290px',
          marginBottom: isMobile ? 32 : 0,
        }}
      >
        <Box marginBottom={32} flexDirection={isMobile ? 'column' : 'row'}>
          <Link href="/movies">
            <Card isMobile={isMobile}>
              <Text marginBottom={24} textAlign="center" isBold fontSize={18}>
                {t('features.title1')}
              </Text>
              <Icon name="file video" size="huge" />

              <Text width="80%" textAlign="center" marginTop={24} textColor="#a8aeb4">
                {t('features.content1')}
              </Text>
            </Card>
          </Link>
          <Link href="/movies">
            <Card isMobile={isMobile}>
              <Text marginBottom={24} textAlign="center" isBold fontSize={18}>
                {t('features.title2')}
              </Text>
              <Icon name="idea" size="huge" />

              <Text width="80%" textAlign="center" marginTop={24} textColor="#a8aeb4">
                {t('features.content2')}
              </Text>
            </Card>
          </Link>
          <Link href="/users">
            <Card isMobile={isMobile}>
              <Text marginBottom={24} textAlign="center" isBold fontSize={18}>
                {t('features.title3')}
              </Text>
              <Icon name="users" size="huge" />

              <Text width="80%" textAlign="center" marginTop={24} textColor="#a8aeb4">
                {t('features.content3')}
              </Text>
            </Card>
          </Link>
        </Box>
      </div>
      <Goal2 isMobile={isMobile}>
        <GoalTitle> {t('latest_movies')}</GoalTitle>

        <Separator />
        <br />
        <List>
          {latestMovies &&
            latestMovies.length > 0 &&
            latestMovies
              .filter((item) => item.movie && item.user)
              .slice(0, isMobile ? 6 : 5)
              .map((item) => {
                const { movie = {}, user = {} } = item || {};
                const { _id, description, themoviedbId, title, image, rating } = movie;
                const { name, username } = user;

                return (
                  <CardContainer
                    key={_id}
                    height={isMobile ? 260 : 400}
                    percent={isMobile || isTablet ? 50 : 20}
                  >
                    <CardMovie
                      isMobile={isMobile}
                      title={title}
                      imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                      href={`/movies/${themoviedbId}`}
                      // imageHeight={70}
                      userRating={rating}
                      titleCentered
                    >
                      <Box flexDirection="column" alignItems="center">
                        <Description>{name || username}</Description>
                      </Box>
                    </CardMovie>
                  </CardContainer>
                );
              })}
        </List>
      </Goal2>
      <footer className={styles.footer}>
        Powered by
        <Text marginLeft={4} isBold>
          Maxus
        </Text>
      </footer>
    </Page>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const feed = await Feed.find({ user: { $exists: true }, movie: { $exists: true } })
    .sort({ created_at: -1 })
    .limit(6)
    .populate('movie')
    .populate('user')
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'User',
          model: 'User',
          select: '_id username email image',
        },
      ],
    });

  return { props: { latestMovies: JSON.parse(JSON.stringify(feed.reverse())) } };
}

export default withTranslation('home')(Home);
