import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import notiReducer from './reducers/notiReducer';

const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer, noti: notiReducer },
});

// import { createStore, combineReducers } from 'redux';
// store.subscribe(() => console.log(store.getState()));

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

export default store;
