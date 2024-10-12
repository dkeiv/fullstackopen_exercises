import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notiSlice = createSlice({
  name: 'noti',
  initialState,
  reducers: {
    createNoti(_, action) {
      return action.payload;
    },
    removeNoti() {
      return '';
    },
  },
});

export const { createNoti, removeNoti } = notiSlice.actions;

let timeoutID = null;
export const setNoti = (message, seconds) => {
  // NOTE: why does this work?
  return async dispatch => {
    dispatch(createNoti(message));

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => dispatch(removeNoti()), seconds * 1000);
  };
};

export default notiSlice.reducer;
