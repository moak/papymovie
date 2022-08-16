import React, { useMemo } from 'react';
import styled from 'styled-components';

import Text from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  cursor: ${(p) => (p.isClickable ? 'pointer' : 'default')};
  transition: transform 200ms ease-in-out;
  padding: 40px;


}`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Choice = styled.div`
  display: flex;
  width: ${(p) => p.width}%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(p) => p.theme.textLight};
  color: ${(p) => p.theme.text};
  border-radius: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  height: 40px;
  background-color: ${(p) =>
    p.state === 0
      ? p.theme.quizzHover
      : p.state === 1
      ? p.theme.success
      : p.state === null
      ? p.theme.quizzHover
      : p.theme.error};



  ${(p) =>
    p.isBlurred
      ? `
        color: transparent;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        `
      : `&:hover{
        transform: scale(1.02);
        background: ${(p) => p.theme.hoverColor};
        font-weight: bold;
      }`};

}`;

const CardQuizz = (props) => {
  const {
    question,
    choices,
    theme,
    onClick,
    isSuccess,
    quizzId,
    state,
    itemClickedIndex,
    answer,
    isMobile,
    isBlurred,
  } = props;

  return (
    <Container borderColor={theme.borderColor}>
      <Text
        dangerouslySetInnerHTML={{ __html: question }}
        isBold
        as="h2"
        textAlign="center"
        marginBottom={40}
        textColor={theme.text}
        fontSize={16}
        isBlurred={isBlurred}
      />
      <Choices>
        {choices.map((choice, index) => {
          const isActive = itemClickedIndex === index;

          return (
            <Choice
              width={isMobile ? 100 : 60}
              theme={theme}
              state={isActive ? state : answer && choice === answer ? 1 : null}
              key={choice}
              onClick={() => onClick(quizzId, index)}
              isBlurred={isBlurred}
            >
              {choice}
            </Choice>
          );
        })}
      </Choices>

      {typeof isSuccess === 'boolean' ? (
        <div style={{ fontSize: 30, textAlign: 'center', marginTop: 20 }}>
          {isSuccess ? '😀 +5' : '😔'}
        </div>
      ) : null}
    </Container>
  );
};

export default CardQuizz;
