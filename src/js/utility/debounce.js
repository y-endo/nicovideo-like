export default function(fn, interval) {
  let timerId;

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
      timerId = null;
    }, interval);
  };
}
