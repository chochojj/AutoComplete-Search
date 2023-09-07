import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { getSicks } from '../apis/apis';
import { Sick } from '../types/types';
import useDebounce from '../hooks/useDebounce';
import SearchInput from '../components/SearchInput';
import SearchResult from '../components/SearchResult';

function Main() {
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [cache, setCache] = useState<{ [key: string]: { data: Sick[]; expiresAt: number } }>({});

  const debouncedValue = useDebounce(value, 250);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cache[debouncedValue] && cache[debouncedValue].expiresAt > Date.now()) {
          setSearchResults(cache[debouncedValue].data);
        } else {
          const response = await getSicks(debouncedValue);
          const newData = response.data;

          setSearchResults(newData);
          setCache({
            ...cache,
            [debouncedValue]: {
              data: newData,
              expiresAt: Date.now() + 300000,
            },
          });
        }
      } catch (error) {
        console.error('데이터를 가져오는 도중 오류 발생:', error);
      }
    };

    if (debouncedValue.trim() !== '') {
      fetchData();
    }
  }, [debouncedValue, cache]);

  const handleSearch = () => {
    // 검색 버튼 클릭 또는 엔터 키 입력 시 실행할 함수
  };

  return (
    <Container>
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
        {isFocus && <SearchResult value={debouncedValue} searchResults={searchResults} />}
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
`;

const Search = styled.div``;
