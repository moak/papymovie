import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Button, Label, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';
import { truncate } from 'utils/string';

import Text from './Text';

const SocialButtons = styled.div`
  display: flex;
  justify-content: ${(p) => (p.isMobile ? 'center' : 'start')};
}`;

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
  width: ${(p) => (p.isMobile ? '120px' : '120px')};
}`;

const UserContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;

}`;

const UserImage = styled.img`
  border-radius: 50%;
  border: 1px solid #ffffff;
  margin-right: ${(p) => (p.isMobile ? 8 : 12)}px;
  cursor: pointer;
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
  const [session] = useSession();

  if (!feedItem.movie || !feedItem.user) {
    return null;
  }

  const {
    _id,
    created_at,
    likes = [],
    dislikes = [],
    user: { _id: userId, image: userImage, name: userName } = {},
    movie: { image: movieImage, title, rating, themoviedbId } = {},
  } = feedItem;

  const [isLikingLoading, setIsLikingLoading] = useState(false);
  const [isDislikingLoading, setIsDislikingLoading] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [dislikesState, setDislikesState] = useState(dislikes);

  const linkMovie = themoviedbId ? `/movies/${themoviedbId}` : null;
  const linkUser = `/users/${userId}`;

  const handleClickLike = useCallback(async (e) => {
    e.preventDefault();

    if (!session) {
      return null;
    }

    try {
      setIsLikingLoading(true);
      const request = await fetch(`${process.env.API_URL}/api/feed/${_id}/like`, {
        method: 'Post',
      });

      const { data } = await request.json();
      const { likes, dislikes } = data;

      setIsLikingLoading(false);

      setLikesState(likes);
      setDislikesState(dislikes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickDislike = useCallback(async (e) => {
    e.preventDefault();

    if (!session) {
      return null;
    }

    try {
      setIsDislikingLoading(true);
      const request = await fetch(`${process.env.API_URL}/api/feed/${_id}/dislike`, {
        method: 'Post',
      });

      const { data } = await request.json();
      const { likes, dislikes } = data;

      setIsDislikingLoading(false);

      setLikesState(likes);
      setDislikesState(dislikes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const component = (
    <Wrapper>
      <Container isMobile={isMobile}>
        <UserContainer>
          <UserImage
            isMobile={isMobile}
            onClick={(e) => {
              e.preventDefault();
              router.push(linkUser);
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
            }}
            width={isMobile ? 30 : 40}
            height={isMobile ? 30 : 40}
            src={userImage}
          />

          <NameContainer>
            <Link href={linkUser}>
              <Text
                style={{ cursor: 'pointer' }}
                isBold
                fontSize={isMobile ? 12 : 14}
                marginBottom={4}
                cursor="pointer"
              >
                {userName}
              </Text>
            </Link>
            <Text textColor="grey" fontSize={isMobile ? 11 : 12}>
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
                alignItems: 'center',
                flexBasis: 80,
              }}
            >
              <Link href={linkMovie}>
                <Text
                  cursor="pointer"
                  textAlign="center"
                  marginRight={4}
                  marginLeft={4}
                  marginBottom={8}
                  isBold
                  fontSize={14}
                >
                  {truncate(title, 50)}
                </Text>
              </Link>
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

          <SocialButtons isMobile={isMobile}>
            <Button onClick={handleClickLike} as="div" labelPosition="right">
              <Button compact size="mini" color="green">
                <Icon name={isLikingLoading ? 'loading' : 'thumbs up'} />
              </Button>
              <Label style={{ fontSize: 12 }} as="a" basic color="green" pointing="left">
                {!!likesState && likesState.length}
              </Label>
            </Button>
            <Button as="div" onClick={handleClickDislike} labelPosition="right">
              <Button compact size="mini" color="red">
                <Icon name={isDislikingLoading ? 'loading' : 'thumbs down'} />
              </Button>
              <Label style={{ fontSize: 12 }} as="a" basic color="red" pointing="left">
                {!!dislikesState && dislikesState.length}
              </Label>
            </Button>
          </SocialButtons>
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
          src={`https://image.tmdb.org/t/p/w300/${movieImage}`}
        />
      </MovieContainer>
    </Wrapper>
  );

  return component;
};

export default React.memo(CardFeed);
