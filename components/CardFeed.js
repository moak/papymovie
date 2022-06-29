import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Button, Label, Icon, Comment, Form, TextArea } from 'semantic-ui-react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';
import { truncate } from 'utils/string';

import Text from './Text';

const SocialButtons = styled.div`
  display: flex;
  justify-content: ${(p) => (p.isMobile ? 'center' : 'start')};
  margin-bottom: 12px;
}`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${(p) => p.theme.borderColor};
  border-radius: 10px;
  background-color: ${(p) => p.theme.background};
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
  border: 1px solid ${(p) => p.theme.borderColor};
  margin-right: ${(p) => (p.isMobile ? 8 : 12)}px;
  cursor: pointer;
}`;

const MovieImage = styled.img`
  border-top-right-radius: 10px;
}`;

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
flex: 1;
}`;

const CardFeed = (props) => {
  const { feedItem, isMobile, theme, t } = props;
  const router = useRouter();
  const { data: session } = useSession();

  const [isCommentFieldVisible, setIsCommentFieldVisible] = useState(false);
  const [feedItemState, setFeedItem] = useState(feedItem);
  const [pendingComment, setPendingComment] = useState('');

  const inputCommentRef = useRef(null);

  if (!feedItem.movie || !feedItem.user) {
    return null;
  }

  const {
    _id,
    created_at,
    likes = [],
    dislikes = [],
    user: { _id: userId, image: userImage, name: userName } = {},
    movie: { image: movieImage, title, rating, themoviedbId, mediaType } = {},
    comments,
  } = feedItemState;

  const [isLikingLoading, setIsLikingLoading] = useState(false);
  const [isDislikingLoading, setIsDislikingLoading] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [dislikesState, setDislikesState] = useState(dislikes);

  const linkMovie = themoviedbId ? `/medias/${themoviedbId}?type=${mediaType}` : null;
  const linkUser = `/users/${userId}`;

  const handleClickLike = useCallback(async (e) => {
    e.preventDefault();

    if (!session) {
      return null;
    }

    try {
      setIsLikingLoading(true);
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/feed/${_id}/like`, {
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

  const connect = useCallback(() => {
    signIn(null, { callbackUrl: `${window.location.origin}/community` });
  }, []);

  const toggleCommentBlock = useCallback(() => {
    setIsCommentFieldVisible(!isCommentFieldVisible);
  }, []);

  useEffect(() => {
    if (isCommentFieldVisible) {
      inputCommentRef.current.focus();
    }
  }, [isCommentFieldVisible]);

  const handleClickComment = useCallback(async () => {
    try {
      if (pendingComment) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/feed/${_id}/comment`, {
          method: 'Post',
          body: JSON.stringify({
            content: pendingComment,
          }),
        });

        setPendingComment('');

        const request = await fetch(`${process.env.NEXTAUTH_URL}/api/feed/${_id}/comment`, {
          method: 'GET',
        });

        const { data } = await request.json();
        setFeedItem({ ...feedItem, comments: data.comments });
      }
    } catch (error) {
      console.log(error);
    }
  }, [pendingComment]);

  const handleClickDislike = useCallback(async (e) => {
    e.preventDefault();

    if (!session) {
      return null;
    }

    try {
      setIsDislikingLoading(true);
      const request = await fetch(`${process.env.NEXTAUTH_URL}/api/feed/${_id}/dislike`, {
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

  const handleChangeComment = useCallback((event) => {
    setPendingComment(event.target.value);
  }, []);

  const component = (
    <Wrapper theme={theme}>
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

          <div>
            <Link href={linkUser}>
              <Text
                as="a"
                textColor={theme.text}
                isBold
                fontSize={isMobile ? 12 : 14}
                marginBottom={4}
                cursor="pointer"
              >
                {userName}
              </Text>
            </Link>
            <Text textColor={theme.textLight} fontSize={isMobile ? 11 : 12}>
              {moment(created_at).locale(router.locale).fromNow()}
            </Text>
          </div>
        </UserContainer>
        <DetailsContainer>
          {isMobile ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexBasis: 80,
                justifyContent: 'center',
              }}
            >
              <Link href={linkMovie}>
                <Text
                  textColor={theme.text}
                  cursor="pointer"
                  textAlign="center"
                  marginRight={8}
                  marginLeft={-35}
                  maxWidth={150}
                  isBold
                  fontSize={14}
                >
                  {truncate(title, 50)}
                </Text>
              </Link>
              <RoundedLabel
                borderWith={2}
                width="26px"
                height="26px"
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
                <Text textColor={theme.text}>
                  {userName} {t('view.added')}
                </Text>
                <Text
                  textColor={theme.text}
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
                <Text textColor={theme.text} marginRight={8}>
                  {t('view.in_library')}
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
            </>
          )}
          <SocialButtons isMobile={isMobile}>
            <Button onClick={session ? handleClickLike : signIn} as="div" labelPosition="right">
              <Button
                compact
                size={isLikingLoading ? 'mini' : 'tiny'}
                style={{ color: theme.white, backgroundColor: theme.like }}
              >
                <Icon name={'thumbs up'} />
              </Button>
              <Label style={{ fontSize: 12 }} as="a" basic pointing="left">
                {!!likesState && likesState.length}
              </Label>
            </Button>
            <Button onClick={session ? handleClickDislike : signIn} as="div" labelPosition="right">
              <Button compact size={isDislikingLoading ? 'mini' : 'tiny'} color={theme.dislike}>
                <Icon name={'thumbs down'} />
              </Button>
              <Label style={{ fontSize: 12 }} as="a" basic pointing="left">
                {!!dislikesState && dislikesState.length}
              </Label>
            </Button>
          </SocialButtons>

          {comments?.length > 0 ? (
            <Comment.Group>
              {comments.map((comment, index) => {
                return (
                  <Comment key={index}>
                    <Comment.Avatar src={comment?.user?.image} />
                    <Comment.Content>
                      <Comment.Author style={{ color: theme.text }} as="a">
                        {comment?.user?.name}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div style={{ color: theme.textLight }}>
                          {moment(comment.updated_at).locale(router.locale).fromNow()}
                        </div>
                      </Comment.Metadata>
                      <Comment.Text style={{ color: theme.textLight }}>
                        {comment.content}
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })}
            </Comment.Group>
          ) : null}

          <Form style={{ fontSize: '1.2rem' }}>
            {isCommentFieldVisible ? (
              <TextArea
                ref={inputCommentRef}
                textColor={theme.text}
                style={{
                  fontSize: isMobile ? '16px' : '14px',
                  resize: 'none',
                  padding: '10px',
                }}
                value={pendingComment}
                onChange={handleChangeComment}
                placeholder={t('view.comment_placeholder')}
              />
            ) : null}

            <Button
              size="tiny"
              style={{ marginTop: '12px' }}
              labelPosition="left"
              icon="edit"
              content={t('view.comment_button')}
              primary
              onClick={
                session
                  ? isCommentFieldVisible
                    ? handleClickComment
                    : toggleCommentBlock
                  : connect
              }
            />
          </Form>
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
          height="180"
          src={`https://image.tmdb.org/t/p/w300/${movieImage}`}
        />
      </MovieContainer>
    </Wrapper>
  );

  return component;
};

export default React.memo(CardFeed);
