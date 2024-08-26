import { useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timeout = useRef(null);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const debouncedCb = (...args) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callback(...args);
    }, [delay]);
  };

  return debouncedCb;
};