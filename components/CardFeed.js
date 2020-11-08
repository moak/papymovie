import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

import Text from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid grey;
}`;

const Wrapper = styled.div`
  display: flex;
}`;
const UserContainer = styled.div`
  display: flex;
}`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`;

const UserImage = styled.img`
  border-radius: 50%;
  border: 1px solid #ffffff;
  margin-right: 16px;
}`;
const MovieImage = styled.img`
  border: 1px solid #ffffff;
  margin-right: 16px;
}`;

const DetailsContainer = styled.div`

}`;
const NameContainer = styled.div`

}`;

const CardFeed = (props) => {
  const { href, name, userImage, movieImage, date, rating, movieTitle } = props;

  console.log('name', name);
  const component = (
    <Wrapper>
      <Container>
        <UserContainer>
          <UserImage
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
            }}
            width="40px"
            height="40px"
            src={userImage}
          />

          <NameContainer>
            <Text isBold fontSize={16} marginBottom={4}>
              {name}
            </Text>
            <Text fontSize={12}>{date}</Text>
          </NameContainer>
        </UserContainer>
        <DetailsContainer>
          <div>
            Seyaa added <b>{movieTitle} </b> in his library.
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
          <div>Comments (4)</div>
          <div>Likes (48)</div>
        </DetailsContainer>
      </Container>
      <MovieImage
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
        }}
        width="50px"
        height="100%"
        src={movieImage}
      />
    </Wrapper>
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default CardFeed;
