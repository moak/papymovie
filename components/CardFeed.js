import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';

import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';

import Text from './Text';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #d8d7d7;
  border-radius: 10px;
  background-color: #f5f5f5;
}`;

const Container = styled.div`
  padding: ${(p) => (p.isMobile ? '12px 12px' : '16px 16px')};
  flex: 1;
  display: flex;
  flex-direction: column;
}`;

const MovieContainer = styled.div`
  cursor: pointer;
  width: ${(p) => (p.isMobile ? '100px' : '120px')};
}`;

const UserContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

}`;

const UserImage = styled.img`
  border-radius: 50%;
  border: 1px solid #ffffff;
  margin-right: 16px;


}`;
const MovieImage = styled.img`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}`;

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
flex: 1;

}`;
const NameContainer = styled.div`

}`;

const CardFeed = (props) => {
  const { feedItem, isMobile } = props;
  const router = useRouter();

  if (!feedItem.movie || !feedItem.user) {
    return null;
  }

  const {
    created_at,
    likes,
    comments,
    user: { _id: userId, image: userImage, name: userName } = {},
    movie: { image: movieImage, title, rating, themoviedbId } = {},
  } = feedItem;

  const linkMovie = themoviedbId ? `/movies/${themoviedbId}` : null;
  const linkUser = `/users/${userId}`;

  const component = (
    <Wrapper>
      <Container isMobile={isMobile}>
        <UserContainer>
          <UserImage
            onClick={(e) => {
              e.preventDefault();
              router.push(linkUser);
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
            }}
            width="40px"
            height="40px"
            src={userImage}
            style={{ cursor: 'pointer' }}
          />

          <NameContainer>
            <Text
              onClick={(e) => {
                e.preventDefault();
                router.push(linkUser);
              }}
              style={{ cursor: 'pointer' }}
              isBold
              textColor="#0070f3"
              fontSize={16}
              marginBottom={4}
            >
              {userName}
            </Text>
            <Text textColor="grey" fontSize={12}>
              {moment(created_at).fromNow()}
            </Text>
          </NameContainer>
        </UserContainer>
        <DetailsContainer>
          {isMobile ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexBasis: 80,
              }}
            >
              <Text
                textAlign="center"
                marginRight={4}
                marginLeft={4}
                isBold
                onClick={(e) => {
                  e.preventDefault();
                  router.push(linkMovie);
                }}
                cursor="pointer"
              >
                {title}
              </Text>
              <RoundedLabel
                borderWith={2}
                width="30px"
                height="30px"
                rounded
                color={getColorFromMark(rating)}
              >
                {rating}
              </RoundedLabel>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  marginBottom: 16,
                  alignItems: 'center',
                }}
              >
                <Text>{userName} added</Text>
                <Text
                  marginRight={4}
                  marginLeft={4}
                  isBold
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(linkMovie);
                  }}
                  cursor="pointer"
                >
                  {title}
                </Text>
                <Text marginRight={8}>in his library.</Text>

                <RoundedLabel
                  borderWith={2}
                  width="30px"
                  height="30px"
                  rounded
                  color={getColorFromMark(rating)}
                >
                  {rating}
                </RoundedLabel>
              </div>
            </>
          )}
          {/* <div style={{ display: 'flex' }}>
            <Text isBold style={{ marginRight: 8 }}>
              Likes ({likes.length})
            </Text>
            <Text isBold>Comments ({comments.length})</Text>
          </div> */}
        </DetailsContainer>
      </Container>
      <MovieContainer isMobile={isMobile}>
        <MovieImage
          onClick={(e) => {
            e.preventDefault();
            router.push(linkMovie);
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100%"
          height="100%"
          src={`https://image.tmdb.org/t/p/w500/${movieImage}`}
        />
      </MovieContainer>
    </Wrapper>
  );

  return component;
};

export default CardFeed;
