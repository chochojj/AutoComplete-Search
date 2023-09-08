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
