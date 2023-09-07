import React from 'react';
import { styled } from 'styled-components';

interface InputProps {
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

function SearchInput({ isFocus, setIsFocus, value, setValue, onSearch }: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <Container>
      <input
        type="text"
        placeholder="질환명을 입력해 주세요."
        value={value}
        onFocus={() => setIsFocus(true)}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSearchClick}></button>
    </Container>
  );
}

export default SearchInput;

const Container = styled.div``;
