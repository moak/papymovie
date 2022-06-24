import React from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0 1 auto;
  position: relative;
  justify-content: center;
  align-items: center;
  flex: 0 1 auto;
  height: 32px;
  width: 215px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  color: #262626;
  font-size: ${(p) => p.fontSize}px;
  position: absolute;
  outline: 0;
  border-radius: 3px;
  border: solid 1px #dbdbdb;
  line-height: 18px;
  padding: 3px 10px 3px 14px;
  background: #fafafa;
`;

const IconOuterWrapper = styled.div`
  position: absolute;
  width: 215px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 0 15px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 3px;
  border: solid 1px #dbdbdb;
`;

const IconInnerWrapper = styled.div`
  position: relative;
  left: -5px;
  display: block;
  flex-direction: column;
  align-content: center;
  text-align: center;
`;

const Span = styled.span`
  display: inline;
  max-width: 140px;
  display: inline-block;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  vertical-align: middle;
`;

const SearchIcon = styled.i`
  color: #8e8e8e;
  display: inline-block;
  font-size: 10px;
  padding: 0 4px 0 0;
  vertical-align: middle;
`;

const LeftSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 11px;
  z-index: 2;
`;

const RightSearchIcon = styled(SearchIcon)`
  position: absolute;
  color: #cccccc;
  font-size: 15px;
  right: 5px;
  z-index: 3;
`;

const SearchContainer = (props) => {
  const { placeholder, onChange, value, onDelete, isMobile } = props;

  const [query, setQuery] = useState(value || placeholder);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  const handleOnClick = () => {
    setIsFocused(true);
    if (query === placeholder) {
      setQuery('');
      onChange('');
      inputRef.current.focus();
    } else {
      inputRef.current.select();
    }
  };

  const handleXCircleClick = () => {
    setQuery(placeholder);
    onChange('');
    setIsFocused(false);
    inputRef.current.blur();
    onDelete();
  };

  const preventBlur = (e) => {
    e.preventDefault();
  };

  const handleOnBlur = () => {
    if (query === '') {
      setQuery(placeholder);
    }
    setIsFocused(false);
  };
  const handleOnFocus = () => {
    if (query === '') {
      setQuery('');
    }
  };

  return (
    <Container>
      <Input
        spellcheck="false"
        fontSize={isMobile ? 16 : 14}
        onChange={handleQueryChange}
        value={query}
        ref={inputRef}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        autoComplete="off"
      />
      {isFocused ? (
        <>
          <Span>{query}</Span>
          <RightSearchIcon onMouseDown={preventBlur} onClick={handleXCircleClick}>
            <Icon style={{ fontSize: 16 }} name="close" color="grey" />
          </RightSearchIcon>
        </>
      ) : (
        <>
          <LeftSearchIcon>
            <Icon size="large" name="search" />
          </LeftSearchIcon>
          <IconOuterWrapper onClick={handleOnClick}>
            <IconInnerWrapper>
              <SearchIcon />
              <Span>{query}</Span>
            </IconInnerWrapper>
          </IconOuterWrapper>
        </>
      )}
    </Container>
  );
};

export default SearchContainer;
