import styled from 'styled-components';

const CardContainer = styled.div`
  width: ${(p) => `${p.percent}%` || null};
  height: ${(p) => `${p.height}px` || null};
  display: flex;
  padding: 0 8px;
  background-color: #fff;
  margin-bottom: 16px;
}`;

export default CardContainer;
