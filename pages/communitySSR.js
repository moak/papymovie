import React from 'react';
import styled from 'styled-components';

import { connectToDatabase } from 'utils/mongodb';

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
            Community
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

// Community.getInitialProps = async () => {
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feed`);

//   const { data } = await res.json();

//   return {
//     feed: data,
//     namespacesRequired: ['common'],
//   };
// };

// export async function getStaticProps() {
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feed`);

//   const { data } = await res.json();

//   console.log('data', data);
//   return { props: { feed: data } };
// }

// export async function getStaticProps() {
//   // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feed`);

//   // const { data } = await res.json();

//   // console.log('data', data);
//   // return { props: { feed: data } };

//   dbConnect();

//   const feed = await Feed.find({})
//     .populate('movie')
//     .populate('user')
//     .populate({
//       path: 'comments',
//       populate: [
//         {
//           path: 'User',
//           model: 'User',
//           select: '_id username email image',
//         },
//       ],
//     });
//   return { props: { feed } };

//   // return {

//   //   // namespacesRequired: ['common'],
//   // };
// }

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const feed = await db.collection('feeds').find({}).limit(2).toArray();

  return {
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
    },
  };
}

export default Community;
