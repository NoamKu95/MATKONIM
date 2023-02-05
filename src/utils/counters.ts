export const countItemsUnderEachKey = (
  obj: { [key: string]: any[] },
  keys: string[]
) => {
  return keys.map((key) => {
    return obj[key] ? obj[key].length : 0;
  });
};

export const countKeys = (obj: { [key: string]: any[] }) => {
  return Object.values(obj).reduce((sum, arr) => {
    return sum + arr.length;
  }, 0);
};
