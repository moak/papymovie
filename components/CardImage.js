import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isMobile ? 'row' : 'column')};
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
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

const Image = styled.img`

}`;

const CardImage = (props) => {
  const { imageUrl, href, isMobile, theme } = props;

  const component = (
    <Container borderColor={theme.borderColor} isClickable={!!href} isMobile={isMobile}>
      <Image
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';
        }}
        width="100%"
        height="100%"
        src={imageUrl}
      />
    </Container>
  );

  if (href) {
    return <Link href={href}>{component}</Link>;
  }

  return component;
};

export default React.memo(CardImage);
