export const generateUniqueId = (() => {
  let count = 0;
  return (prefix = '') => `${prefix}${++count}`;
})();
