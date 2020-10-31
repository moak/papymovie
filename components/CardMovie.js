import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactStars from 'react-rating-stars-component';

import styled from 'styled-components';

import Text from '../components/Text';
import RoundedLabel from '../components/RoundedLabel';
import getColorFromMark from '../utils/getColorFromMark';

import styles from '../styles/Home.module.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cecece;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;

  &:hover {
    box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

}`;

const ImageContainer = styled.div`
  height: 80%;
  position: relative;
}`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-top: 1px solid #cecece;
}`;

const GradeContainer = styled.div`
  position: absolute;
  top: -18px;
  left: 7.5%;
}`;

const VotesContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
}`;

const Image = styled.img`

}`;

const CardMovie = (props) => {
  const { title, subtitle, imageUrl, href, grade, amountVotes, userRating } = props;

  return (
    <Link href={href}>
      <Container>
        <ImageContainer>
          <Image
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
            }}
            width="100%"
            height="100%"
            src={imageUrl}
          />
          {amountVotes && (
            <VotesContainer>
              <RoundedLabel width="50px" height="26px" color="#333333">
                {amountVotes}
              </RoundedLabel>
            </VotesContainer>
          )}
        </ImageContainer>
        <ContentContainer>
          {grade && (
            <GradeContainer>
              <RoundedLabel borderWith={2} rounded color={getColorFromMark(grade)}>
                {grade}
              </RoundedLabel>
            </GradeContainer>
          )}
          <Text isBold fontSize={16} marginTop={grade ? 8 : 0} marginBottom={8}>
            {title}
          </Text>
          {subtitle && <Text>{subtitle}</Text>}
          {userRating && (
            <ReactStars
              count={5}
              size={24}
              color2={'#ffd700'}
              color1={'#d3d3d3'}
              value={userRating}
              style={{ marginBottom: 10 }}
              isHalf
              edit={false}
              className={styles.stars}
            />
          )}
        </ContentContainer>
      </Container>
    </Link>
  );
};

export default CardMovie;
