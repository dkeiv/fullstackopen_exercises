import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

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
export default notiSlice.reducer;
