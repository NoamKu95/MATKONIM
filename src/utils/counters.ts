export const countItemsUnderEachKey = (
  dict: { [key: string]: any[] },
  keysArr: string[]
) => {
  return keysArr.map((givenKey) => {
    return dict[givenKey] ? dict[givenKey].length : 0;
  });
};

export const countKeys = (dict: { [key: string]: any[] }) => {
  return Object.values(dict).reduce((sum, arr) => {
    return sum + arr.length;
  }, 0);
};
