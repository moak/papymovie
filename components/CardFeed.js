import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment';
import { useRouter } from 'next/router';

import Text from './Text';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid grey;
  justify-content: space-between;
  border-radius: 10px;

}`;

const Container = styled.div`
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`;

const MovieContainer = styled.div`
  cursor: pointer;
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
      <Container>
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
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: 32,
            }}
          >
            <div style={{ marginRight: 16, marginBottom: isMobile ? 8 : 0 }}>
              {userName} added
              <b
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(linkMovie);
                }}
              >
                {` ${title} `}
              </b>
              in his library.
            </div>
            {rating && (
              <ReactStars
                count={5}
                size={24}
                color2={'#ffd700'}
                color1={'#d3d3d3'}
                value={rating}
                isHalf
                edit={false}
              />
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <Text isBold style={{ marginRight: 8 }}>
              Likes ({likes.length})
            </Text>
            <Text isBold>Comments ({comments.length})</Text>
          </div>
        </DetailsContainer>
      </Container>
      <MovieContainer>
        <MovieImage
          onClick={(e) => {
            e.preventDefault();
            router.push(linkMovie);
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100px"
          height="100%"
          src={`https://image.tmdb.org/t/p/w500/${movieImage}`}
        />
      </MovieContainer>
    </Wrapper>
  );

  return component;
};

export default CardFeed;
