// const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

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
