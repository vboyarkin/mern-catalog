import { useRef } from "react";
import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
}

/**
 * @param {Function} callback
 * @param {Number} delay in ms
 * @param {Boolean} skipFirstRender should skip first render?
 * @param {Array} initialArgs array of arguments passed on first render
 * Returns debounced callback
 * */
export function useDebouncedCallback(
  callback,
  delay,
  skipFirstRender = true,
  initialArgs = []
) {
  const [args, setArgs] = useState(initialArgs);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!skipFirstRender || !isFirstRender) {
        callback(...args);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, args);

  return function (...args) {
    setArgs(args);
  };
}

export function useIsFirstRender() {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender;
}

