export default function debounce(fn, interval) {
  let timerId;

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
      timerId = null;
    }, interval);
  };
}
