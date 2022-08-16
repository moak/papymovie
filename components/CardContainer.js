import styled from 'styled-components';

const CardContainer = styled.div`
  width: ${(p) => `${p.percent}%` || null};
  height: ${(p) => `${p.height}px` || null};
  display: flex;
  flex-direction: ${(p) => (p.inline ? 'row' : 'column')};
  padding: 0 8px;
  margin-bottom: 16px;
}`;

export default CardContainer;
