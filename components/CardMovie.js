import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from 'components/Text';
import RoundedLabel from 'components/RoundedLabel';

import getColorFromMark from 'utils/getColorFromMark';

const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isMobile ? 'row' : 'column')};
  overflow: visible;
  width: 100%;
  height: 100%;
}`;

const ImageContainer = styled.div`
  height: ${(p) => (p.isMobile ? 100 : p.imageHeight || 80)}%;
  position: relative;
  width: ${(p) => (p.isMobile ? 40 : 100)}%;
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
  height: ${(p) => (p.isMobile ? '30%' : 'auto' || 75)};
  margin-top: 4px;
}`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #ffffff;
  width: ${(p) => (p.isMobile ? 60 : 100)}%;
  min-width: ${(p) => (p.isMobile ? 60 : 100)}%;
}`;

const GradeContainerDesktop = styled.div`
  position: absolute;
  bottom: ${(p) => (p.isMobile ? 10 : -4)}%;
  left: 7.5%;
  z-index: 2;
}`;

const GradeContainerMobile = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: center;
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
    centered,
    imageHeight,
    isMobile,
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
          height="100%"
          src={imageUrl}
          style={{ borderRadius: 10 }}
        />
        {!isMobile && userRating ? (
          <UserRatingContainer isMobile={isMobile}>
            <RoundedLabel borderWith={3} rounded color={getColorFromMark(userRating)}>
              {userRating}
            </RoundedLabel>
          </UserRatingContainer>
        ) : null}

        {grade && !isMobile ? (
          <GradeContainerDesktop>
            <RoundedLabel borderWith={3} rounded color={getColorFromMark(grade)}>
              {grade}
            </RoundedLabel>
          </GradeContainerDesktop>
        ) : null}
      </ImageContainer>
      {!withoutContent && (
        <ContentContainer isMobile={isMobile}>
          <TitleContainer grade={grade} isMobile={isMobile}>
            <Text
              isBold
              textAlign={centered || isMobile ? 'center' : 'left'}
              fontSize={16}
              marginBottom={4}
              dotdotdot
            >
              {title}
            </Text>
          </TitleContainer>
          {subtitle && (
            <Text textAlign={isMobile ? 'center' : 'left'} marginBottom={4}>
              {subtitle}
            </Text>
          )}

          {isMobile && (
            <GradeContainerMobile>
              <RoundedLabel borderWith={3} rounded color={getColorFromMark(grade)}>
                {grade}
              </RoundedLabel>
            </GradeContainerMobile>
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

export default CardMovie;
