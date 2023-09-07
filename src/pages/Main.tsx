import { styled } from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResult from '../components/SearchResult';
import { getSicks } from '../apis/apis';
import { Sick } from '../types/types';
import useDebounce from '../hooks/useDedounce';

function Main() {
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Sick[]>([]);

  const debouncedKeyword = useDebounce(value);

  const CacheSearchResults = useCallback(async () => {
    const searchResultData = await getSicks(debouncedKeyword);
    setSearchResults(searchResultData);
  }, [debouncedKeyword]);

  useEffect(() => {
    debouncedKeyword.trim() && CacheSearchResults();
  }, [debouncedKeyword, CacheSearchResults]);

  const handleSearch = () => {};

  const openSearchBar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFocus(true);
  };

  const CloseSearcResult = () => {
    setIsFocus(false);
  };

  return (
    <Container onClick={() => CloseSearcResult()}>
      <Text>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </Text>
      <Search>
        <SearchInput
          value={value}
          setValue={setValue}
          onClick={(e: React.MouseEvent) => openSearchBar(e)}
          onSearch={handleSearch}
        />
        {isFocus && (
          <SearchResult
            value={value}
            searchResults={searchResults}
            onClick={(e: React.MouseEvent) => openSearchBar(e)}
          />
        )}
      </Search>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  height: 450px;
  background-color: #cae9ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  height: 100px;
  font-weight: bold;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
`;

const Search = styled.div``;
