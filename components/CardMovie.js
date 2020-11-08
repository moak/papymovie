import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from '../components/Text';
import RoundedLabel from '../components/RoundedLabel';
import getColorFromMark from '../utils/getColorFromMark';

const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isMobile ? 'row' : 'column')};
  border: 1px solid #cecece;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;

  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};

  ${(p) =>
    p.isClickable &&
    `
    &:hover{
      box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.4);
    }
  `}

}`;

const ImageContainer = styled.div`
  height: ${(p) => (p.isMobile ? 100 : p.imageHeight || 75)}%;
  position: relative;
  width: ${(p) => (p.isMobile ? 40 : 100)}%;
  min-width: ${(p) => (p.isMobile ? 40 : 100)}%;
}`;

const TitleContainer = styled.div`
  height: ${(p) => (p.isMobile ? '40%' : 'auto' || 75)};
  margin-top: ${(p) => (p.grade ? 30 : 0)}px;
}`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-top: 1px solid #cecece;
  width: ${(p) => (p.isMobile ? 60 : 100)}%;
  min-width: ${(p) => (p.isMobile ? 60 : 100)}%;
}`;

const GradeContainer = styled.div`
  position: absolute;
  top: ${(p) => (p.isMobile ? 10 : -18)}px;
  left: 7.5%;
}`;

const VotesContainer = styled.div`
  position: absolute;
  top: ${(p) => (p.isMobile ? 10 : -14)}px;
  right: 12px;
}`;

const Image = styled.img`

}`;

const CardMovie = (props) => {
  const {
    children,
    _id,
    title,
    themoviedbId,
    subtitle,
    imageUrl,
    href,
    grade,
    amountVotes,
    userRating,
    centered,
    imageHeight,
    isMobile,
    isMyProfile,
  } = props;

  const component = (
    <Container isClickable={!!href} isMobile={isMobile}>
      <ImageContainer imageHeight={imageHeight} isMobile={isMobile}>
        <Image
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100%"
          height="100%"
          src={imageUrl}
        />
      </ImageContainer>
      <ContentContainer isMobile={isMobile}>
        {amountVotes && (
          <VotesContainer isMobile={isMobile}>
            <RoundedLabel width="50px" height="26px" color="#333333">
              {amountVotes}
            </RoundedLabel>
          </VotesContainer>
        )}
        {grade ? (
          <GradeContainer isMobile={isMobile}>
            <RoundedLabel borderWith={3} rounded color={getColorFromMark(grade)}>
              {grade}
            </RoundedLabel>
          </GradeContainer>
        ) : null}
        <TitleContainer grade={grade} isMobile={isMobile}>
          <Text
            isBold
            textAlign={centered ? 'center' : 'left'}
            fontSize={16}
            marginTop={isMyProfile ? 0 : isMobile ? 16 : 0}
            marginBottom={8}
            dotdotdot
          >
            {title}
          </Text>
        </TitleContainer>
        {subtitle && <Text>{subtitle}</Text>}
        {children}
      </ContentContainer>
    </Container>
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default CardMovie;
