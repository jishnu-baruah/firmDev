

export const generateUniqueId = (() => {
  let count = 0;
  return (prefix = '') => `${prefix}${++count}`;
})();


// export const generateUniqueId = (baseId) => `${baseId}-${Date.now()}`;
