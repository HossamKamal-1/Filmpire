import { useEffect, useState } from 'react';

const useDebounce = (valueToBeDebounced, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(valueToBeDebounced.trim().toLowerCase());
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, valueToBeDebounced]);
  return debouncedValue;
};
export default useDebounce;
