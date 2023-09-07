import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { styled } from 'styled-components';
import { Sick } from '../types/types';

interface SearchResultProps {
  value: string;
  searchResults: Sick[];
  onClick: (event: React.MouseEvent) => void;
}

function SearchResult({ value, searchResults, onClick }: SearchResultProps) {
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusedItemIndex > 0) {
        setFocusedItemIndex(focusedItemIndex - 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusedItemIndex < searchResults.length - 1) {
        setFocusedItemIndex(focusedItemIndex + 1);
      }
    }
  };

  const handleItemClick = (index: number, e: React.MouseEvent<HTMLLIElement>) => {
    onClick(e);
  };

  return (
    <Container onClick={onClick}>
      {searchResults.length > 0 && value ? (
        <ul onKeyDown={handleKeyDown} tabIndex={0} autoFocus={true}>
          {searchResults.map((keyword, index) => (
            <Item
              key={keyword.sickCd}
              className={focusedItemIndex === index ? 'focused' : ''}
              onClick={e => handleItemClick(index, e)}
            >
              <SearchIcon />
              <span>{keyword.sickNm}</span>
            </Item>
          ))}
        </ul>
      ) : (
        <div>검색어가 없습니다.</div>
      )}
    </Container>
  );
}

export default SearchResult;

const Container = styled.div`
  position: absolute;
  width: 460px;
  height: 400px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 20px;
  padding: 18px 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  -ms-overflow-style: none;
  scrollbar-width: none;

  ul {
    outline: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  gap: 6px;
  padding: 7px;

  ${props =>
    props.className === 'focused' &&
    `
    background-color: #d2f2ff;
  `}
`;

const SearchIcon = styled(BsSearch)`
  margin-top: 4px;
`;
