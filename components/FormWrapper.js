import styled from 'styled-components';
import media from 'utils/media';

const FormWrapper = styled.div`
  width: 520px;
  padding: 50px;
  border: 1px solid #d4ddf0;
  box-shadow: 0 0 10px 0 #dadada;
  border-radius: 5px;
  color: #5e6c84;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${media.phone`
    width: 100%;
    padding: 15px 25px 25px 25px;
    margin-top: 0px;
    box-shadow: none;
    border-width: 0px;
  `}
`;

export default FormWrapper;
