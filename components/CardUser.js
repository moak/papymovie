import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import Text from './Text';
import RoundedLabel from './RoundedLabel';
import getColorFromMark from '../utils/getColorFromMark';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cecece;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  &:hover{
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    background-color: white;
    .ico{
      color: #FFAE00;
    }
  }

}`;

const UserContainer = styled.div`
  height: 100%;
  position: relative;
}`;

const BackgroundImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-image: url(${(p) => p.backgroundUrl});
  background-repeat: no-repeat;
  background-size:  100% 200px;
  position: relative;
}`;

const InfosContainer = styled.div`
  height: 60px;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #F3F3F3;
  font-size: 14px;
  font-weight: 600;
  text-align: center;

}`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`;

const Image = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  border: 1px solid #ffffff;
}`;

const NameContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
}`;

const CardUser = (props) => {
  const { href, name, imageUrl, infos } = props;

  return (
    <Link href={href}>
      <Container>
        <UserContainer>
          <BackgroundImage backgroundUrl="https://picsum.photos/200/300" />

          <Image
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
            }}
            width="100px"
            height="100px"
            src={imageUrl}
          />
          <NameContainer>
            <Text isBold fontSize={16}>
              {name}
            </Text>
          </NameContainer>
        </UserContainer>
        <InfosContainer>
          {infos.map((info) => {
            const { amount, title } = info;

            return (
              <InfoContainer key={title}>
                <Text fontSize={16} isBold marginBottom={4}>
                  {amount}
                </Text>
                <Text>{title}</Text>
              </InfoContainer>
            );
          })}
        </InfosContainer>
      </Container>
    </Link>
  );
};

export default CardUser;
