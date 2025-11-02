import { useRef, useEffect, useCallback } from 'react';
import { debounce } from './debounce.js';

/**
 * React hook that debounces a callback function
 * @template T
 * @param {T} fn - The function to debounce
 * @param {number} wait - Milliseconds to wait before invoking
 * @param {{leading?: boolean, trailing?: boolean, maxWait?: number}} [options] - Debounce options
 * @param {any[]} [deps=[]] - Dependency array to recreate debounced function
 * @returns {T & { cancel: () => void, flush: () => void }} - Debounced function with cancel and flush methods
 */
export function useDebouncedCallback(fn, wait, options = {}, deps = []) {
  // Store the latest function to avoid stale closures
  const fnRef = useRef(fn);

  // Update ref when fn changes
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // Create debounced function with stable identity
  const debouncedFn = useCallback(() => {
    // Wrapper that always calls the latest function
    const wrapper = (...args) => {
      return fnRef.current(...args);
    };

    return debounce(wrapper, wait, options);
  }, [wait, options.leading, options.trailing, options.maxWait, ...deps]);

  // Get the actual debounced function
  const debounced = useRef(debouncedFn());

  // Recreate debounced function when dependencies change
  useEffect(() => {
    debounced.current = debouncedFn();

    // Cleanup: cancel pending invocations on unmount or dependency change
    return () => {
      debounced.current.cancel();
    };
  }, [debouncedFn]);

  // Return wrapper that calls current debounced instance
  return useCallback(
    Object.assign(
      (...args) => debounced.current(...args),
      {
        cancel: () => debounced.current.cancel(),
        flush: () => debounced.current.flush(),
      }
    ),
    []
  );
}
