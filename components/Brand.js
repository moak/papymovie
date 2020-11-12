import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Logo = styled.a`
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  color: #ffffff;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #ffffff;
  }
`;

const Brand = (props) => {
  const { isConnected } = props;

  return (
    <Link href={isConnected ? '/movies' : '/'} passHref>
      <Logo>PapyMovie</Logo>
    </Link>
  );
};

export default Brand;
