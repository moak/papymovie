import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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
    !p.isMobile &&
    `
    &:hover{
      box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.4);
    }
  `}
}`;

const Image = styled.img`

}`;

const CardImage = (props) => {
  const { imageUrl, href, imageHeight = 100, isMobile } = props;

  const component = (
    <Container isClickable={!!href} isMobile={isMobile}>
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
