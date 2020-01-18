// utils/debounce.ts
/**
 * debounce
 * @packageDocumentation
 */

export default function debounce(fn: Function, interval: number) {
  let timerId: NodeJS.Timeout | null;

  return () => {
    if (timerId !== null) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
      timerId = null;
    }, interval);
  };
}
