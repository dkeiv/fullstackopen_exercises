import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import notiReducer from './reducers/notiReducer';

const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer, noti: notiReducer },
});

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

// store.subscribe(() => console.log(store.getState()));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
