import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useGetSession } from 'utils/session';

import {
  Popup,
  Form,
  Image,
  TextArea,
  Button,
  Label,
  Icon,
  Comment,
  Header,
} from 'semantic-ui-react';

import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';

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

const TipCommentBloc = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
}`;

const NameContainer = styled.div`

}`;

const CardFeed = (props) => {
  const { feedItem, isMobile } = props;
  const router = useRouter();
  const { session } = useGetSession();

  if (!feedItem.movie || !feedItem.user) {
    return null;
  }

  const {
    _id,
    created_at,
    likes = [],
    dislikes = [],
    comments = [],
    user: { _id: userId, image: userImage, name: userName } = {},
    movie: { image: movieImage, title, rating, themoviedbId } = {},
  } = feedItem;

  const [showComments, setShowComments] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [dislikesState, setDislikesState] = useState(dislikes);
  const [commentsState, setCommentsState] = useState(comments);
  const [comment, setComment] = useState('');

  const linkMovie = themoviedbId ? `/movies/${themoviedbId}` : null;
  const linkUser = `/users/${userId}`;

  const handleClickLike = useCallback(async () => {
    try {
      const request = await fetch(`${process.env.API_URL}/api/feed/${_id}/like`, {
        method: 'Post',
      });

      const { data } = await request.json();
      const { likes, dislikes } = data;

      setLikesState(likes);
      setDislikesState(dislikes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickDislike = useCallback(async () => {
    try {
      const request = await fetch(`${process.env.API_URL}/api/feed/${_id}/dislike`, {
        method: 'Post',
      });

      const { data } = await request.json();
      const { likes, dislikes } = data;

      setLikesState(likes);
      setDislikesState(dislikes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitComment = useCallback(
    async (e) => {
      e.preventDefault();

      console.log('submt comment= >', comment);
      if (comment.length > 0) {
        try {
          const request = await fetch(`${process.env.API_URL}/api/feed/${_id}/comment`, {
            method: 'Post',
            body: JSON.stringify({ comment }),
          });

          const { data } = await request.json();
          setCommentsState(data.comments);
          setComment('');
        } catch (error) {
          console.log(error);
        }
      }
    },
    [comment],
  );

  const toggleShowComments = useCallback(() => {
    event.preventDefault();
    setShowComments(!showComments);
  }, [showComments]);

  const changeComment = useCallback((event) => {
    event.preventDefault();
    setComment(event.target.value);
  }, []);

  console.log('comment', comment);

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
                // justifyContent: 'space-around',
                alignItems: 'center',
                flexBasis: 80,
              }}
            >
              <Text
                textAlign="center"
                marginRight={4}
                marginLeft={4}
                marginBottom={8}
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

          <SocialButtons isMobile={isMobile}>
            <Button as="div" labelPosition="right">
              <Button
                compact
                size="mini"
                color="green"
                onClick={
                  session
                    ? (e) => {
                        e.preventDefault();
                        handleClickLike();
                      }
                    : null
                }
              >
                <Icon name="thumbs up" />
              </Button>
              <Label as="a" basic color="green" pointing="left">
                {!!likesState && likesState.length}
              </Label>
            </Button>
            <Button as="div" labelPosition="right">
              <Button
                compact
                size="mini"
                color="red"
                onClick={
                  session
                    ? (e) => {
                        e.preventDefault();
                        handleClickDislike();
                      }
                    : null
                }
              >
                <Icon name="thumbs down" />
              </Button>
              <Label as="a" basic color="red" pointing="left">
                {!!dislikesState && dislikesState.length}
              </Label>
            </Button>
            {/* <Button as="div" labelPosition="right">
              <Button
                compact
                size='mini'
                onClick={toggleShowComments}
                basic
                color="blue"
              >
                <Icon name="comment" />
                {isMobile ? null : 'comments'}
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentsState && commentsState.length}
              </Label>
            </Button> */}
          </SocialButtons>

          <TipCommentBloc>
            {showComments && [
              <Header key={1} as="h3" style={{ marginTop: '5px', marginBottom: '5px' }} dividing>
                Comments
              </Header>,
              <Comment.Group style={{ marginTop: '0px' }} key={2} size="small">
                {commentsState.map((comment) => {
                  return (
                    <Comment key={comment._id}>
                      <Comment.Avatar
                        as="a"
                        src={comment.user && comment.user.image ? comment.user.image : null}
                      />
                      <Comment.Content style={{ marginLeft: '3em' }}>
                        <Comment.Author to={`/users/23`} href={`/users/23`} as="a">
                          {comment.user && comment.user.username}
                        </Comment.Author>
                        <Comment.Metadata>
                          <span>{moment(comment.updated_at).fromNow()}</span>
                        </Comment.Metadata>
                        <Comment.Text>{comment.content}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  );
                })}
              </Comment.Group>,
              <Form style={{ fontSize: '1.2rem' }} key={3} onSubmit={submitComment}>
                <TextArea
                  style={{ fontSize: '16px' }}
                  value={comment}
                  onChange={changeComment}
                  disabled={!session}
                  placeholde="Write a comment"
                />
                <Button
                  size="tiny"
                  style={{ marginTop: '5px' }}
                  labelPosition="left"
                  icon="edit"
                  content="Comment"
                  primary
                  disabled={!session || comment.length === 0}
                  onClick={submitComment}
                />
              </Form>,
            ]}
          </TipCommentBloc>
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
