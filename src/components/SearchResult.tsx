import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { styled } from 'styled-components';
import { Sick } from '../types/types';

interface SearchResultProps {
  value: string;
  searchResults: Sick[];
  onClick: (event: React.MouseEvent) => void;
  isFocus: boolean;
  focusedItemIndex: number;
  handleItemClick: (index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLUListElement>) => void;
}

function SearchResult({
  value,
  searchResults,
  onClick,
  isFocus,
  focusedItemIndex,
  handleItemClick,
  handleKeyDown,
}: SearchResultProps) {
  return (
    <Container onClick={onClick}>
      {searchResults.length > 0 && value ? (
        <ul onKeyDown={handleKeyDown} tabIndex={0}>
          {searchResults.map((keyword, index) => (
            <Item
              key={keyword.sickCd}
              className={focusedItemIndex === index ? 'focused' : ''}
              onClick={() => handleItemClick(index)}
            >
              <SearchIcon />
              <span>{keyword.sickNm}</span>
            </Item>
          ))}
        </ul>
      ) : (
        <NoData>검색어가 없습니다.</NoData>
      )}
    </Container>
  );
}

export default SearchResult;

const Container = styled.div`
  position: absolute;
  width: 460px;
  height: 350px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 20px;
  padding: 18px 0px;
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

const NoData = styled.div`
  padding: 0px 15px;
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  gap: 6px;
  padding: 7px 15px;

  ${props =>
    props.className === 'focused' &&
    `
    background-color: #d2f2ff;
  `}
`;

const SearchIcon = styled(BsSearch)`
  margin-top: 4px;
`;
