import { styled } from 'styled-components';
import { Sick } from '../types/types';

interface SearchResultProps {
  value: string;
  searchResults: Sick[];
}

function SearchResult({ value, searchResults }: SearchResultProps) {
  return (
    <Container>
      <p>{value}</p>
      <h2>추천 검색어</h2>
      <ul>
        {searchResults.map(keyword => (
          <li key={keyword.sickCd}>{keyword.sickNm}</li>
        ))}
      </ul>
    </Container>
  );
}

export default SearchResult;

const Container = styled.div``;
