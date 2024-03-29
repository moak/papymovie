import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from 'components/Text';
import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  width: 100%;
  height: 100%;
  padding: 2px;

  -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.5s; /* Firefox < 16 */
   -ms-animation: fadein 0.5s; /* Internet Explorer */
    -o-animation: fadein 0.5s; /* Opera < 12.1 */
       animation: fadein 0.5s;


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

}`;

const ImageContainer = styled.div`
  height: ${(p) => p.height};
  position: relative;
  min-width: ${(p) => (p.isMobile ? 40 : 100)}%;
}`;

const Image = styled.img`
  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};
  transition: transform 200ms ease-in-out;


  ${(p) =>
    p.isClickable &&
    !p.isMobile &&
    `
    &:hover{
      transform: scale(1.02);
    }
  `}

}`;

const TitleContainer = styled.div`
  margin-top: 4px;
}`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(p) => (p.isMobile ? 8 : 12)}px;
}`;

const GradeContainerDesktop = styled.div`
  position: absolute;
  bottom: ${(p) => (p.isMobile ? 10 : -4)}%;
  left: 7.5%;
  z-index: 2;
}`;

const UserRatingContainer = styled.div`
  position: absolute;
  top: ${(p) => (p.isMobile ? 10 : 10)}px;
  right: 7.5%;
}`;

const CardMovie = (props) => {
  const {
    withoutContent = false,
    children,
    title,
    subtitle,
    imageUrl,
    href,
    grade,
    userRating,
    imageHeight,
    isMobile,
    titleCentered,
    height,
    theme,
  } = props;

  const component = (
    <Container>
      <ImageContainer
        height={height}
        isClickable={!!href}
        imageHeight={imageHeight}
        isMobile={isMobile}
      >
        <Image
          isMobile={isMobile}
          isClickable={!!href}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100%"
          height="100%"
          src={imageUrl}
          alt={title}
          style={{ borderRadius: 10 }}
        />
        {userRating ? (
          <UserRatingContainer isMobile={isMobile}>
            <RoundedLabel borderWith={2} rounded color={getColorFromMark(userRating)}>
              {userRating}
            </RoundedLabel>
          </UserRatingContainer>
        ) : null}

        {grade ? (
          <GradeContainerDesktop>
            <RoundedLabel borderWith={2} rounded color={getColorFromMark(grade)}>
              {grade}
            </RoundedLabel>
          </GradeContainerDesktop>
        ) : null}
      </ImageContainer>
      {!withoutContent && (
        <ContentContainer isMobile={isMobile}>
          <TitleContainer grade={grade} isMobile={isMobile}>
            <Text
              dotdotdot
              isBold
              fontSize={16}
              marginBottom={4}
              textAlign={titleCentered ? 'center' : 'left'}
              textColor={theme.text}
            >
              {title}
            </Text>
          </TitleContainer>
          {subtitle && (
            <Text textColor={theme.textLight} dotdotdot>
              {subtitle}
            </Text>
          )}

          {children}
        </ContentContainer>
      )}
    </Container>
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default React.memo(CardMovie);
