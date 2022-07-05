export const wrapInTimeout = (callback) => {
  const timeout = process.env.REACT_APP_IS_DEV
    ? 1500 + 400 * 2 * (Math.random() - 0.5)
    : 0;

  return setTimeout(() => {
    callback();
  }, timeout);
};
