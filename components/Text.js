import styled from 'styled-components';

const Text = styled.div`
  font-size: ${(p) => p.fontSize || 14}px;
  color: ${(p) => p.textColor || 'black'};
  font-weight: ${(p) => (p.isBold ? 500 : 400)};

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
