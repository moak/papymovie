import React, { useEffect } from 'react';

import useIsMobile from 'hooks/useIsMobile';

import PageContainer from 'components/PageContainer';
import Page from 'components/Page';
import Text from 'components/Text';
import EmptyState from 'components/EmptyState';
import CardUser from 'components/CardUser';
import CardContainer from 'components/CardContainer';
import List from 'components/List';

const Movies = (props) => {
  const { users } = props;
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <Page
      title="Users - PapyMovie"
      description="Check out your friends movies or follow the most inspiring users"
    >
      <PageContainer>
        <Text marginBottom={24} fontSize={32}>
          Users
        </Text>

        {!users || (users && users.length === 0) ? (
          <EmptyState>No users on the platform.</EmptyState>
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
                      { amount: user.movies.length, title: 'Movies' },
                      { amount: user.followers.length, title: 'Followers' },
                      { amount: user.followings.length, title: 'Following' },
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

Movies.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/users`);

  const { data } = await res.json();
  return { users: data };
};

export default Movies;
