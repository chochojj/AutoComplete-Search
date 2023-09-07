import { BsSearch } from 'react-icons/bs';
import { styled } from 'styled-components';
import { Sick } from '../types/types';

interface SearchResultProps {
  value: string;
  searchResults: Sick[];
}

function SearchResult({ value, searchResults }: SearchResultProps) {
  return (
    <Container>
      {searchResults.length > 0 && value ? (
        <>
          <ul>
            {searchResults.map(keyword => (
              <Item key={keyword.sickCd}>
                <SearchIcon />
                <span>{keyword.sickNm}</span>
              </Item>
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
  padding: 20px 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  gap: 6px;
  padding: 7px;
`;

const SearchIcon = styled(BsSearch)`
  margin-top: 4px;
`;
