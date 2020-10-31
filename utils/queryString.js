export const queryStringToObject = (queryString) => {
  const result = {};
  Array.from(new URLSearchParams(queryString).entries()).forEach((paramArray) => {
    const [key, value] = paramArray;
    result[key] = value;
  });
  return result;
};

export const objectToQueryString = (object) => {
  return new URLSearchParams(object).toString();
};
