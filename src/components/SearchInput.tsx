import React from 'react';
import { styled } from 'styled-components';

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onClick: (event: React.MouseEvent) => void;
}

function SearchInput({ value, onClick, setValue, onSearch }: InputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Container onClick={onClick}>
      <input
        type="text"
        placeholder="질환명을 입력해 주세요."
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <button onClick={onSearch}>검색</button>
    </Container>
  );
}

export default SearchInput;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;

  input {
    width: 380px;
    height: 50px;
    border-radius: 20px 0 0 20px;
    border: none;
    padding: 0 15px;
    outline: none;
  }

  button {
    width: 80px;
    height: 50px;
    border: none;
    border-radius: 0 20px 20px 0;
    background-color: #007be9;
    color: white;
    font-size: 18px;
  }
`;
