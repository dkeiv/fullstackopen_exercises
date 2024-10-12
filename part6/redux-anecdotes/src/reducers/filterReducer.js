export const selectFilter = state => state.filter;

export const filterChange = filter => {
  return {
    type: 'filter/change',
    payload: filter,
  };
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'filter/change':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
