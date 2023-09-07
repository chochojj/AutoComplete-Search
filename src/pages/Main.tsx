import { styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
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
  const ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    debouncedKeyword.trim() && CacheSearchResults();
  }, [debouncedKeyword]);

  const CacheSearchResults = async () => {
    const searchResultData = await getSicks(debouncedKeyword);
    setSearchResults(searchResultData);
  };

  const handleSearch = () => {};

  return (
    <Container ref={ContainerRef} onClick={event => event.stopPropagation()}>
      <Text>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </Text>
      <Search>
        <SearchInput
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          value={value}
          setValue={setValue}
          onSearch={handleSearch}
        />
        {isFocus && (
          <SearchResult value={value} setValue={setValue} searchResults={searchResults} />
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
