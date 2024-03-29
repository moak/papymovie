/* eslint-disable react/display-name */

import React from 'react';

import styled from 'styled-components';

const Text = styled.div`
  font-size: ${(p) => p.fontSize || 14}px;
  color: ${(p) => p.textColor || 'black'};
  font-weight: ${(p) => (p.isBold ? 600 : 400)};

  padding: ${(p) => p.padding || 0}px;
  margin-top: ${(p) => p.marginTop || 0}px;
  margin-bottom: ${(p) => p.marginBottom || 0}px;
  margin-left: ${(p) => p.marginLeft || 0}px;
  margin-right: ${(p) => p.marginRight || 0}px;

  line-height: ${(p) => p.lineHeight || 'normal'};
  width: ${(p) => (p.width ? `${p.width}` : 'auto')};
  max-width: ${(p) => (p.maxWidth ? `${p.maxWidth}px` : null)};
  text-align: ${(p) => p.textAlign || 'left'};
  text-transform: ${(p) => p.textTransform || 'none'};
  cursor: ${(p) => p.cursor || 'auto'};

  ${(p) =>
    p.isBlurred
      ? `
        color: transparent;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        `
      : null};

  ${(p) =>
    p.dotdotdot &&
    `
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
  `}
`;

const TextTag = React.forwardRef(({ children, as = 'div', ...props }) => {
  return (
    <Text as={as} {...props}>
      {children}
    </Text>
  );
});

export default TextTag;
