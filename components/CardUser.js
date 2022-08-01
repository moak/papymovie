import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Text from './Text';
import getRandomNumber from 'utils/getRandomNumber';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};
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
  margin-bottom: 8px;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 5px;

}`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}`;

const Image = styled.img`
  border-radius: 50%;
  position: absolute;
  top: ${(p) => (p.isMobile ? 50 : 70)}%;
  left: 50%;
  transform: translate(-50%, -${(p) => (p.isMobile ? 50 : 70)}%);
  border: 2px solid ${(p) => p.borderColor};
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
  const { href, name, imageUrl, infos, isMobile, theme } = props;

  const getRandomImage = useMemo(() => {
    return images[getRandomNumber(0, images.length - 1)];
  }, []);

  const component = (
    <Container borderColor={theme.borderColor} isClickable={!!href} isMobile={isMobile}>
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
          borderColor={theme.borderColor}
        />
        <NameContainer>
          <Text
            cursor="pointer"
            textColor={theme.text}
            textAlign="center"
            isBold
            fontSize={16}
            marginBottom={-4}
          >
            {name}
          </Text>
        </NameContainer>
      </UserContainer>
      <InfosContainer>
        {infos.map((info) => {
          const { amount, title } = info;

          return (
            <InfoContainer key={title}>
              <Text textColor={theme.text} fontSize={18} isBold>
                {amount}
              </Text>
              <Text isBold textColor={theme.text} fontSize={11}>
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

export default CardUser;
