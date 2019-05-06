export const themes = (color = '#fff') => ({
  tan: {
    body: {
      '-webkit-user-select': 'none',
      'user-select': 'none',
      'background-color': color
    }
  }
});

export const createBatchObject = (count = 0) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({});
  }
  return list;
};
