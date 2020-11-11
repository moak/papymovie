import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from './Text';
import getRandomNumber from 'utils/getRandomNumber';

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
    !p.isMobile &&
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
  height: ${(p) => (p.isMobile ? 120 : 200)}px;

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
  top: ${(p) => (p.isMobile ? 50 : 70)}%;
  left: 50%;
  transform: translate(-50%, -${(p) => (p.isMobile ? 50 : 70)}%);
  border: 2px solid #ffffff;
}`;

const NameContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 100%;
}`;

//picsum.photos/265/200?random=0.4697816248839266

const images = [
  'https://i.picsum.photos/id/154/265/200.jpg?hmac=bXZZfPchEv1Jh-FQzFFSGRcKQk7z3NyKaTm8lhJv2fM',
  'https://i.picsum.photos/id/765/265/200.jpg?hmac=f_RD9fPJLNndzyEtMg7HRFPkqGpyyHUPzowTlSa5T5M',
  'https://i.picsum.photos/id/537/265/200.jpg?hmac=tXtg3mZhgOhBQPuxK-yW93Np8PLVCkD7ILougIS8IsI',
  'https://i.picsum.photos/id/52/265/200.jpg?hmac=tpccfdlnnbHRKG8JoYPxzhlwhcVBkT5X3i8laLUI1hs',
  'https://i.picsum.photos/id/974/265/200.jpg?hmac=wHfruI3gdA2enQTxQ7oSvhNgBj6UbArWdRpCP6vyrK4',
  'https://i.picsum.photos/id/196/265/200.jpg?hmac=306T2zPeKgS7rs4BDTe2TeXaaUNwDECA-duue8nnhQ8',
  'https://i.picsum.photos/id/249/265/200.jpg?hmac=L0RIXB8dmkHDY1epWu5hHCwLpBbZyAJwM3lyYLE89Kk',
  'https://i.picsum.photos/id/797/265/200.jpg?hmac=GhvM-j-e8Dx-rznyyY77TbbvNHsNwJIyx-zzoZHWKTI',
  'https://i.picsum.photos/id/676/265/200.jpg?hmac=YKlco3qBdd4Zx_a5AwMtr7ynT8LsWsfHsq_Y4eNjGco',
];

const CardUser = (props) => {
  const { href, name, imageUrl, infos, isMobile } = props;

  const getRandomImage = useMemo(() => {
    return images[getRandomNumber(0, images.length - 1)];
  }, []);

  const component = (
    <Container isClickable={!!href} isMobile={isMobile}>
      <UserContainer>
        <BackgroundImage isMobile={isMobile} backgroundUrl={getRandomImage} />

        <Image
          isMobile={isMobile}
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
