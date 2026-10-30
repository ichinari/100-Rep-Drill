import { useState } from "react";

const isNegative = (value: number) => value < 0;

/**
 * カウンターフック
 * @param initialValue 初期値
 */
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrement = () => {
    setCount((prevCount) => {
      if (isNegative(prevCount - 1)) return prevCount;
      return prevCount - 1;
    });
  };
  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
};

export default useCounter;
