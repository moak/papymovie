import styled from 'styled-components';

const Grade = styled.div`
  width: ${(p) => p.width || '38px'};
  height: ${(p) => p.height || '38px'};
  background-color: ${(p) => p.color};
  border-radius: ${(p) => (p.rounded ? '50%' : '10%')};
  color: #ffffff;
  display: flex;
  align-items: center;
  font-weight: 800;
  justify-content: center;
  border: ${(p) => `${p.borderWith || 0}px solid #333333`};
  margin-top: ${(p) => `${p.marginTop || 0}px`};
  font-size: 14px;
}`;

export default Grade;
