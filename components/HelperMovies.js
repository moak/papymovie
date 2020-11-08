import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

import Text from 'components/Text';
import RoundedLabel from 'components/RoundedLabel';

import useIsMobile from 'hooks/useIsMobile';
import useIsTablet from 'hooks/useIsTablet';

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flexDirection || 'row'};
  justify-content: ${(p) => p.justifyContent || 'flex-start'};
`;

const HelperMovies = (props) => {
  const { isClosable } = props;

  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const handleClickClose = useCallback((e) => {
    e.preventDefault();
    setIsOpen(false);
  });
  if (!isOpen) {
    return null;
  }

  return null;

  return (
    <>
      <Message warning onDismiss={isClosable ? handleClickClose : null}>
        <Message.Header>Information</Message.Header>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ width: '50px', marginRight: 20 }}>
            <RoundedLabel borderWith={3} rounded color="#21ba45 ">
              {6}
            </RoundedLabel>
          </div>
          <div style={{ flex: 1 }}>
            Global rating on <a href="www.themoviedb.org">themoviedb</a>.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50px', marginRight: 14 }}>
            <RoundedLabel width="50px" height="26px" color="#333333">
              {345}
            </RoundedLabel>
          </div>

          <div style={{ flex: 1 }}>
            Amount of votes on <a href="www.themoviedb.org">themoviedb</a>.
          </div>
        </div>
      </Message>
    </>
  );
};

export default HelperMovies;
