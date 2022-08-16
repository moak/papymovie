import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import ContentLoader from 'react-content-loader';
import { signIn } from 'next-auth/react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import useIsMobile from 'hooks/useIsMobile';

import PageContainer from 'components/PageContainer';
import Page from 'components/Page';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardQuizz from 'components/CardQuizz';
import CardContainer from 'components/CardContainer';
import CardFeedUser from 'components/CardFeedUser';

const MyLoader = ({ theme }) => (
  <ContentLoader
    speed={2}
    width={400}
    height={300}
    viewBox="0 0 400 300"
    backgroundColor="#f0f0f0"
    foregroundColor="#ecebeb"
  >
    <rect x="70" y="70" rx="10" ry="10" width="250" height="20" />
    <rect x="70" y="110" rx="10" ry="10" width="250" height="20" />
    <rect x="70" y="150" rx="10" ry="10" width="250" height="20" />
    <rect x="70" y="190" rx="10" ry="10" width="250" height="20" />

    <rect x="70" y="0" rx="5" ry="5" width="250" height="30" />
  </ContentLoader>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.width};
  min-width: ${(p) => p.width};
}`;

const Quizz = (props) => {
  const { toggleTheme, theme } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isPlayable, setIsPlayable] = useState(true);
  const [isSuccess, setIsSuccess] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [quizz, setQuizz] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [itemClickedIndex, setItemClickedIndex] = useState(null);

  const { data: session } = useSession();

  const { t } = useTranslation('quizz');
  const router = useRouter();

  const isMobile = useIsMobile();

  const connect = useCallback(() => {
    signIn(null, { callbackUrl: `${window.location.href}` });
  }, []);

  const loadRandomQuizz = async () => {
    try {
      setIsLoading(true);
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/quizz/random`);

      const { data } = await request.json();

      const { quizz } = data;

      if (quizz[router.locale].question && quizz[router.locale].choices) {
        setQuizz(data);
        setIsLoading(false);
      } else {
        loadRandomQuizz();
      }

      // setIsPlayable(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRanking = async () => {
    try {
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/users/rankQuizz`);

      const { data } = await request.json();

      setRanking(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRandomQuizz();
    loadRanking();
  }, []);

  const handleClickQuizz = useCallback(async (quizzId, index) => {
    setIsSuccess(null);
    setItemClickedIndex(index);

    const answerQuery = await fetch(`${process.env.NEXTAUTH_URL}/api/quizz/validate`, {
      method: 'POST',
      body: JSON.stringify({
        _id: quizzId,
        answer: index,
        userId: session?.user?.id,
        lang: router.locale,
      }),
    });

    const { isSuccess, answer } = await answerQuery.json();
    setIsSuccess(!!isSuccess);
    setAnswer(answer);
  });

  useEffect(() => {
    if (typeof isSuccess === 'boolean') {
      setTimeout(() => {
        loadRandomQuizz();
        setItemClickedIndex(null);
        setAnswer(null);
        setIsSuccess(null);
        loadRanking();
      }, 1500);
    }
  }, [isSuccess]);

  return (
    <Page
      toggleTheme={toggleTheme}
      theme={theme}
      title={t('list.metas.title')}
      description={t('list.metas.description')}
      url="/quizz"
    >
      <PageContainer>
        <Text textColor={theme.text} isBold marginBottom={24} fontSize={26}>
          {t('title')}
        </Text>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          {!quizz ? (
            <Container width={isMobile ? '100%' : '70%'}>
              <EmptyState>
                {isLoading ? (
                  <MyLoader theme={theme} />
                ) : (
                  <>
                    {t('no_result')}
                    <Button style={{ marginTop: 16 }} circular primary onClick={loadRandomQuizz}>
                      {t('reload')}
                    </Button>
                  </>
                )}
              </EmptyState>
            </Container>
          ) : (
            <Container width={isMobile ? '100%' : '70%'}>
              <CardContainer width={100} height={420} percent={100}>
                {!session ? (
                  <div
                    style={{
                      marginTop: 30,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      textColor={theme.text}
                      isBold
                      marginBottom={24}
                      fontSize={isMobile ? 20 : 26}
                    >
                      Connect to access the quizz
                    </Text>
                    <Button
                      style={{ marginBottom: 20, marginRight: 16, width: 130 }}
                      circular
                      primary
                      onClick={connect}
                    >
                      Connect
                    </Button>
                  </div>
                ) : null}
                <CardQuizz
                  isBlurred={!isPlayable || !session}
                  quizzId={quizz._id}
                  question={quizz.quizz[router.locale]?.question}
                  choices={quizz.quizz[router.locale]?.choices}
                  onClick={!isPlayable || !session ? () => null : handleClickQuizz}
                  isMobile={isMobile}
                  theme={theme}
                  state={typeof isSuccess === 'boolean' ? (isSuccess ? 1 : 2) : 0}
                  isSuccess={isSuccess}
                  answer={answer}
                  itemClickedIndex={itemClickedIndex}
                />
              </CardContainer>
            </Container>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: isMobile ? '100%' : '30%',
              height: '100%',
              marginLeft: isMobile ? 0 : 18,
            }}
          >
            <Text textColor={theme.text} isBold marginBottom={12} fontSize={isMobile ? 26 : 18}>
              Top users
            </Text>
            {ranking?.map((userRank) => {
              return (
                <div
                  key={userRank._id}
                  style={{
                    marginBottom: 12,
                    height: 60,
                  }}
                >
                  <CardFeedUser
                    withTrophy
                    isAnimated
                    theme={theme}
                    name={userRank.user.name}
                    imageUrl={userRank.user.image}
                    href={`/users/${userRank._id}`}
                    infos={[
                      { amount: ` ${userRank.ok * 5} ` },
                      {
                        amount: `${Math.round((100 * userRank.ok) / userRank.total)}%`,
                        isBold: false,
                      },
                    ]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'quizz'])),
    },
  };
}

// export default Users;
export default dynamic(() => Promise.resolve(Quizz), { ssr: false });
