import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { signIn } from 'next-auth/react';

import { useSession, getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import dbConnect from 'utils/dbConnect';
import Feed from 'models/Feed';

import Movies from 'public/icons/Movies';
import Social from 'public/icons/Social';
import Users from 'public/icons/Users';

import Page from 'components/Page';
import Text from 'components/Text';
import CardContainer from 'components/CardContainer';
import List from 'components/List';
import Box from 'components/Box';
import CardMovie from 'components/CardMovie';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

const Footer = styled.div`
width: 100%;
height: 100px;
border-top: 1px solid ${(p) => p.borderColor};
display: flex;
justify-content: center;
align-items: center;
}`;

const Description = styled.div`
  height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}`;

const Container = styled.div`
  height: ${(p) => (p.isMobile ? 500 : 620)}px;
  display: flex;
  background-image: url('./cover.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;
  justify-content: ${(p) => (p.isMobile ? 'flex-start' : 'center')};
  align-items: center;
  opacity: 0.9;
}`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(p) => (p.isMobile ? 70 : 50)}%;
  margin-top: ${(p) => (p.isMobile ? 110 : 0)}px;
}`;

const Card = styled.div`
  margin: 0 15px;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: ${(p) => (p.isMobile ? 0 : 1)}px solid ${(p) => p.theme.borderColor};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${(p) =>
    !p.isMobile &&
    `
    &:hover {
      color: ${p.theme.textLight};
      border-color: ${p.theme.textLight};
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
  width: 120px;
  height: 2px;
  margin-right: auto;
  margin-left: auto;
  margin: 8px 0;
  background-color: red;
}`;

const Home = (props) => {
  const { latestMovies = [], other, toggleTheme, theme } = props;

  const { t } = useTranslation('home');
  const router = useRouter();
  const { data: session, status } = useSession();

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const connect = useCallback(() => {
    signIn(null, { callbackUrl: `${window.location.href}` });
  }, []);

  useEffect(() => {
    if (other || session || isAuthenticated) {
      router.push('movies');
    }
  }, [session, isAuthenticated]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <Page
      title={t('metas.title')}
      description={t('metas.description')}
      isLoading={isLoading || !!other}
      toggleTheme={toggleTheme}
      theme={theme}
    >
      <>
        <Container isMobile={isMobile}>
          <Content isMobile={isMobile}>
            <Text
              width={isMobile ? '340px' : '540px'}
              as="div"
              isBold
              textAlign="center"
              fontFamily="secondary"
              textColor="#ffffff"
              fontSize={isMobile ? 30 : 46}
              marginBottom={36}
              marginTop={130}
            >
              {t('header.title')}
            </Text>

            <Text as="h2" textColor="#ffffff" fontSize={isMobile ? 16 : 24} textAlign="center">
              {t('header.subtitle')}
            </Text>

            <Button style={{ marginTop: 40, width: 170 }} circular primary onClick={connect}>
              {t('connect')}
            </Button>
          </Content>
        </Container>
        <Goal isMobile={isMobile}>
          <GoalTitle textAlign="center"> {t('subheader.title')}</GoalTitle>
          <Separator />
          <Text textColor={theme.text} fontSize={18} textAlign="center">
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
              <Card theme={theme} isMobile={isMobile}>
                <Text
                  cursor="pointer"
                  textColor={theme.text}
                  marginBottom={24}
                  textAlign="center"
                  isBold
                  fontSize={18}
                >
                  {t('features.title1')}
                </Text>

                <Movies width={60} height={60} color={theme.text} />

                <Text
                  cursor="pointer"
                  width="90%"
                  textAlign="center"
                  marginTop={24}
                  textColor={theme.text}
                >
                  {t('features.content1')}
                </Text>
              </Card>
            </Link>
            <Link href="/community">
              <Card theme={theme} isMobile={isMobile}>
                <Text
                  cursor="pointer"
                  textColor={theme.text}
                  marginBottom={24}
                  textAlign="center"
                  isBold
                  fontSize={18}
                >
                  {t('features.title2')}
                </Text>

                <Social width={60} height={60} color={theme.text} />

                <Text
                  cursor="pointer"
                  width="90%"
                  textAlign="center"
                  marginTop={24}
                  textColor={theme.text}
                >
                  {t('features.content2')}
                </Text>
              </Card>
            </Link>
            <Link href="/users">
              <Card theme={theme} isMobile={isMobile}>
                <Text
                  textColor={theme.text}
                  marginBottom={24}
                  textAlign="center"
                  isBold
                  fontSize={18}
                >
                  {t('features.title3')}
                </Text>
                <Users width={60} height={60} color={theme.text} />

                <Text
                  cursor="pointer"
                  width="90%"
                  textAlign="center"
                  marginTop={24}
                  textColor={theme.text}
                >
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
            {latestMovies?.length > 0 &&
              latestMovies
                .filter((item) => item.movie && item.user)
                .slice(0, isMobile ? 6 : 5)
                .map((item) => {
                  const { movie = {}, user = {} } = item || {};
                  const { _id, themoviedbId, title, image, rating } = movie;
                  const { name, username } = user;

                  return (
                    <CardContainer key={_id} percent={isMobile || isTablet ? 50 : 20}>
                      <CardMovie
                        theme={theme}
                        isMobile={isMobile}
                        title={title}
                        imageUrl={`https://image.tmdb.org/t/p/w300/${image}`}
                        href={`/medias/${themoviedbId}`}
                        userRating={rating}
                        titleCentered
                        height={isMobile ? '230px' : '340px'}
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
        <Footer borderColor={theme.borderColor}>
          Powered by
          <Text textColor={theme.text} marginLeft={4} isBold>
            Maxus
          </Text>
        </Footer>
      </>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  await dbConnect();

  const feed = await Feed.find({ user: { $exists: true }, movie: { $exists: true } })
    .sort({ created_at: -1 })
    .populate('movie')
    .populate('user');

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      latestMovies: JSON.parse(JSON.stringify(feed)),
      other: await getSession(context),
    },
  };
}

// export default Home;
export default dynamic(() => Promise.resolve(Home), { ssr: false });
