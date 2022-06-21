import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from 'components/Text';
import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';

const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isMobile ? 'column' : 'column')};
  overflow: visible;
  width: 100%;
  height: 100%;
}`;

const ImageContainer = styled.div`
  height: ${(p) => (p.isMobile ? '220px' : '100%')};
  position: relative;
  width: ${(p) => (p.isMobile ? 100 : 100)}%;
  min-width: ${(p) => (p.isMobile ? 40 : 100)}%;
}`;

const Image = styled.img`
  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};
  ${(p) =>
    p.isClickable &&
    !p.isMobile &&
    `
    &:hover{
      box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.9);
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
  background-color: #ffffff;
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
  } = props;

  const component = (
    <Container isMobile={isMobile}>
      <ImageContainer isClickable={!!href} imageHeight={imageHeight} isMobile={isMobile}>
        <Image
          isMobile={isMobile}
          isClickable={!!href}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100%"
          height="320"
          src={imageUrl}
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
            >
              {title}
            </Text>
          </TitleContainer>
          {subtitle && <Text dotdotdot>{subtitle}</Text>}

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
