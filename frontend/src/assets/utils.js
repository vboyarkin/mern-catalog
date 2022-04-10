// TODO: динамически во время билда собирать URL бэкэнда из env переменных?
export const API_URL = "http://localhost:3355/api/";

export const getQueryForArray = (array, key) => {
  let result = "";
  for (const val of array) {
    result += `${key}=${val}&`;
  }
  return result.slice(0, result.length - 1);
};

export const wrapInTimeout = callback => {
  const timeout = window.IS_DEV ? 1500 + 400 * 2 * (Math.random() - 0.5) : 0;

  return setTimeout(() => {
    callback();
  }, timeout);
};
