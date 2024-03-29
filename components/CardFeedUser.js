import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import moment from 'moment';
import FlipNumbers from 'react-flip-numbers';

import Text from './Text';

const Container = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};
  padding: 8px;
  background: ${(p) => p.theme.background};
  box-shadow: ${(p) => p.theme.borderColor} 0px 2px 4px;
  transition: transform 200ms ease-in-out;

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }

  -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.5s; /* Firefox < 16 */
   -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
       animation: fadein 0.5s;

  ${(p) =>
    p.isClickable &&
    !p.isMobile &&
    `
    &:hover{
      transform: scale(1.02);
    }
  `}

}`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 65%;
}`;

const InfosContainer = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 5px;
  width: 35%;
}`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}`;

const UserImage = styled.img`
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.borderColor};
  margin-right: ${(p) => (p.isMobile ? 8 : 12)}px;
  cursor: pointer;
}`;

const CardFeedUser = (props) => {
  const {
    href,
    name,
    imageUrl,
    infos,
    isMobile,
    theme,
    updatedAt,
    isAnimated = false,
    withTrophy = false,
  } = props;

  const router = useRouter();

  const component = (
    <Container borderColor={theme.borderColor} isClickable={!!href} isMobile={isMobile}>
      <UserContainer>
        <UserImage
          isMobile={isMobile}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width={isMobile ? 40 : 30}
          height={isMobile ? 40 : 30}
          src={imageUrl}
        />

        <div>
          <Link href={href}>
            <Text
              textColor={theme.text}
              isBold
              fontSize={14}
              marginBottom={4}
              cursor="pointer"
              dotdotdot
            >
              {name}
            </Text>
          </Link>
          {updatedAt && (
            <Text cursor="pointer" textColor={theme.textLight} fontSize={isMobile ? 11 : 12}>
              {moment(updatedAt).locale(router.locale).fromNow()}
            </Text>
          )}
        </div>
      </UserContainer>
      <InfosContainer>
        {infos.map((info, index) => {
          const { amount, title, isBold = true } = info;

          return (
            <InfoContainer key={index}>
              {isAnimated ? (
                <div style={{ display: 'flex', marginRight: 8 }}>
                  {index === 0 && withTrophy ? <span style={{ marginRight: 4 }}> 🏆</span> : null}
                  <FlipNumbers
                    duration={1}
                    height={16}
                    width={10}
                    play
                    numbers={amount.toString()}
                  />
                </div>
              ) : (
                <Text textColor={theme.text} fontSize={isMobile ? 18 : 16} isBold={isBold}>
                  {amount}
                </Text>
              )}

              <Text isBold={isBold} textColor={theme.text} fontSize={12}>
                {title}
              </Text>
            </InfoContainer>
          );
        })}
      </InfosContainer>
    </Container>
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default CardFeedUser;
