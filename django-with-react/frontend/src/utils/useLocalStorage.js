import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
}

export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState( () => { return getStorageItem(key, initialValue); } );

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore); // 상탯값 반영
    setStorageItem(key, valueToStore); // 실제 로컬스토리지 반영
  };

  return [storedValue, setValue];
}