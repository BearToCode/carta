/**
 * Debounce the provided function.
 * @param cb Callback function.
 * @param wait The time to wait in milliseconds.
 */
export function debounce<T extends unknown[]>(cb: (...args: T) => unknown, wait = 1000) {
  let timeout: number;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  };
}
