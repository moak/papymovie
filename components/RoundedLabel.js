import styled from 'styled-components';

const Grade = styled.div`
  width: ${(p) => p.width || '35px'};
  height: ${(p) => p.height || '35px'};
  background-color: ${(p) => p.color};
  border-radius: ${(p) => (p.rounded ? '50%' : '10%')};
  color: #ffffff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(p) => `${p.borderWith || 0}px solid #333333`};
  font-size: 12px;
  font-weight: 700;
}`;

export default Grade;
