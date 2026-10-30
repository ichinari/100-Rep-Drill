import { useState } from "react";

/**
 * ローカルストレージフック
 * @param key ローカルストレージのキー
 * @param initialValue 初期値
 */
const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setStoredValue = (text: string) => {
    setValue(text);
    localStorage.setItem(key, text);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setStoredValue, removeValue] as const;
};

export default useLocalStorage;
