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
          <Keyword>{value}</Keyword>
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
  width: 460px;
  height: 400px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 20px;
  padding: 25px 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Keyword = styled.p`
  margin-bottom: 3px;
  color: navy;
  font-weight: bold;
`;
