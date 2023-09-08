### 자동완성 검색창

검색을 실행하면 데이터에서 일치하는 요소를 추천검색어로 제공합니다

### 프로젝트의 실행 방법

`git clone` 후, `npm install & npm start`

### 데모 영상

| 검색 | 키보드로 요소 조회 | 
|:-:| :-:|
| | |


### 폴더 구조
```
📦src
 ┣ 📂apis
 ┃ ┣ 📜apis.ts
 ┃ ┗ 📜instance.ts
 ┣ 📂components
 ┃ ┣ 📜SearchInput.tsx
 ┃ ┗ 📜SearchResult.tsx
 ┣ 📂constants
 ┃ ┗ 📜path.ts
 ┣ 📂hooks
 ┃ ┣ 📜useDedounce.ts
 ┃ ┗ 📜useKeyEvent.ts
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.ts
 ┣ 📂types
 ┃ ┗ 📜types.ts
 ┣ 📂utils
 ┃ ┗ 📜cacheStorage.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```


### 기능 설명

#### API 호출별로 로컬 캐싱 구현
같은 키워드에 대해 서버에 중복요청이 가는 것을 방지하기 위해 캐싱 기능을 구현하였습니다
- 캐싱 방식: 사용자의 검색 키워드를 캐시 스토리지에 저장하고, 이후 동일한 키워드 요청이 있을 때는 캐시된 결과를 사용합니다
- 만료 시간: 캐시된 데이터는 5분 동안 유지되며 만료된 데이터는 삭제됩니다

```
import { Sick } from '../types/types';

const EXPIRE_MINUTE = 5;

export const setCacheData = async (url: string, keyword: string, data: Sick[]) => {
  const cacheStorage = await caches.open(url);
  const expireAt = new Date();
  expireAt.setMinutes(expireAt.getMinutes() + EXPIRE_MINUTE);
  const headerOption = {
    headers: {
      Expires: expireAt.toUTCString(),
    },
  };
  const cacheResponse = new Response(JSON.stringify(data), headerOption);
  cacheStorage.put(keyword, cacheResponse);
};

export const getCacheData = async (url: string, keyword: string) => {
  const cacheStorage = await caches.open(url);
  const cachedResponse = await cacheStorage.match(keyword);

  if (!cachedResponse) return null;

  const expireHeader = cachedResponse.headers.get('Expires');
  if (!expireHeader) return null;

  const ExpireTime = new Date(expireHeader);
  const isExpired = new Date() > ExpireTime;
  if (isExpired) return null;

  return cachedResponse;
};

```


#### API 호출 횟수를 줄이기
debounce을 사용하여 일정 시간의 입력값을 모아 처리하는 방법으로 각각의 키보드 이벤트마다 서버에 요청이 가는 것을 방지하였습니다
- usedebounce hook 사용: 키워드를 입력받아 기본적으로 300ms 를 기다린 후 최종 입력값을 리턴하도록 구현하였습니다
```
import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

```
  
#### 키보드로 추천 검색어 이동
키보드만의 위, 아래 화살표 버튼으로 추천 검색어 목록을 탐색할 수 있습니다
- useKeyEvent hook 사용: 포커스된 자료의 인덱스를 관리하여 키보드 이벤트로 탐색할 수 있게 구현하였습니다
```
import React, { useState } from 'react';
import { Sick } from '../types/types';

function useKeyEvent(searchResults: Sick[]) {
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>) => {
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

  const handleItemClick = (index: number) => {
    setFocusedItemIndex(index);
  };

  return { focusedItemIndex, setFocusedItemIndex, handleKeyDown, handleItemClick };
}

export default useKeyEvent;

```
