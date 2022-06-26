import styled from 'styled-components';

const fonts = {
  primary: 'Poppins',
  secondary: 'Poppins',
};

const Text = styled.div`
  font-family: ${(p) => (p.fontFamily === 'secondary' ? fonts.secondary : fonts.primary)},
    sans-serif;

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
  text-align: ${(p) => p.textAlign || 'left'};
  text-transform: ${(p) => p.textTransform || 'none'};
  cursor: ${(p) => p.cursor || 'auto'};

  ${(p) =>
    p.dotdotdot &&
    `
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
  `}
`;

export default Text;
