import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.flexDirection ? p.flexDirection : 'column')};
  justify-content: ${(p) => (p.justifyContent ? p.justifyContent : null)};
  align-items: ${(p) => (p.alignItems ? p.alignItems : null)};

  margin-top: ${(p) => p.marginTop || 0}px;
  margin-bottom: ${(p) => p.marginBottom || 0}px;
  margin-left: ${(p) => p.marginLeft || 0}px;
  margin-right: ${(p) => p.marginRight || 0}px;
  width: ${(p) => p.width || '100%'};
  height: ${(p) => p.height || '100%'};


}`;

export default Box;
