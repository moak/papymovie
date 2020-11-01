import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
}`;

const CardUser = (props) => {
  const { href, name, imageUrl, infos } = props;

  const component = (
    <Container isClickable={!!href}>
      <UserContainer>
        <BackgroundImage
          backgroundUrl={`https://picsum.photos/265/200?random=${Math.random(0, 1)}`}
        />

        <Image
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
          }}
          width="100px"
          height="100px"
          src={imageUrl}
        />
        <NameContainer>
          <Text textAlign="center" isBold fontSize={16}>
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
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default CardUser;
