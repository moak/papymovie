import React from 'react';
import dynamic from 'next/dynamic';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';

import useIsMobile from 'hooks/useIsMobile';

import PageContainer from 'components/PageContainer';
import Page from 'components/Page';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardUser from 'components/CardUser';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

const Users = (props) => {
  const { users } = props;

  const { t } = useTranslation('user');

  const isMobile = useIsMobile();

  return (
    <Page title={t('list.metas.title')} description={t('list.metas.description')} url="/users">
      <PageContainer>
        <Text isBold marginBottom={24} fontSize={32}>
          {t('list.title')}
        </Text>

        {!users || (users && users.length === 0) ? (
          <EmptyState>{t('list.no_result')}</EmptyState>
        ) : (
          <List>
            {users.map((user) => {
              const { _id, name, image } = user;

              return (
                <CardContainer
                  key={_id}
                  height={isMobile ? 280 : 350}
                  percent={isMobile ? 100 : 25}
                >
                  <CardUser
                    isMobile={isMobile}
                    name={name}
                    imageUrl={image}
                    href={`/users/${_id}`}
                    infos={[
                      { amount: user.movies.length, title: t('movies') },
                      { amount: user.followers.length, title: t('followers') },
                      { amount: user.followings.length, title: t('followings') },
                    ]}
                  />
                </CardContainer>
              );
            })}
          </List>
        )}
      </PageContainer>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  await dbConnect();

  const users = await User.find({});

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'user'])),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

// export default Users;
export default dynamic(() => Promise.resolve(Users), { ssr: false });
