import React from 'react';
import styled from 'styled-components';

import media from '../utils/media';

const Logo = styled.a`
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  position: relative;
`;

const Brand = () => {
  return <Logo href="/">GoldMovie</Logo>;
};

export default Brand;

const Image = styled.img`
  height: 85%;
  margin: auto 0;
`;
