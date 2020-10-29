import React, { Component } from 'react';
import styled from 'styled-components';
import media from '../utils/media';

const Label = styled.label`
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 600;

  ${media.phone`
    font-size: 14px;
  `}
`;

export default Label;
