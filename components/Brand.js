import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useIsMobile from 'hooks/useIsMobile';

const Logo = styled.a`
  font-size: 1.7rem;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 2px;
  height: auto;

  &:hover {
    text-decoration: none;
    color: #ffffff;
  }
`;

const Brand = (props) => {
  const { isConnected } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }
  return (
    <Link href={isConnected ? '/movies' : '/'} passHref>
      <Logo>PapyMovie</Logo>
    </Link>
  );
};

export default Brand;
