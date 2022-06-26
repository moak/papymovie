import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 180px 24px 32px 24px;
  height: 100%;
  margin: 0 auto;
  max-width: ${(p) => p.maxWidth || 1180}px;

  @media (max-width: 480px) {
    padding: 88px 16px 32px 16px;
  }

  ${(p) =>
    p.centered &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;`}

}`;

export default PageContainer;
