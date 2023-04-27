export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (data !== null) {
    return JSON.parse(data);
  }

  return [];
};
