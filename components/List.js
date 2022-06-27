import styled from 'styled-components';

const List = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  // overflow-y: scroll;
  // height: 400px;
  // max-height: 400px;



  @media (max-width: 768px) {
    width: 100%;
  }
}`;

export default List;
