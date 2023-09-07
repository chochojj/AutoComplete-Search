import React from 'react';
import { styled } from 'styled-components';
import { Sick } from '../types/types';

interface SearchResultProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Sick[];
}

function SearchResult({ value, setValue, searchResults }: SearchResultProps) {
  return (
    <Container>
      {searchResults.length > 0 && value ? (
        <>
          <p>{value}</p>
          <h2>추천 검색어</h2>
          <ul>
            {searchResults.map(keyword => (
              <li key={keyword.sickCd}>{keyword.sickNm}</li>
            ))}
          </ul>
        </>
      ) : (
        <div>검색어가 없습니다.</div>
      )}
    </Container>
  );
}

export default SearchResult;

const Container = styled.div`
  position: absolute;
  height: 400px;
`;
