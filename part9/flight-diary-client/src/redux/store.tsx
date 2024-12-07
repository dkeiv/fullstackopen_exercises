import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { diaryApi } from './services/diaryApi';

export const store = configureStore({
  reducer: {
    [diaryApi.reducerPath]: diaryApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(diaryApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
