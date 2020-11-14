import React, { useEffect } from 'react';

import { i18n, withTranslation } from 'i18n';

import useIsMobile from 'hooks/useIsMobile';

import PageContainer from 'components/PageContainer';
import Page from 'components/Page';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardUser from 'components/CardUser';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

const Users = (props) => {
  const { users, t } = props;
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

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

Users.getInitialProps = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);

  const { data } = await res.json();
  return { users: data, namespacesRequired: ['user'] };
};

export default withTranslation('user')(Users);
