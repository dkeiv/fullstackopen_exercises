import { useReducer } from 'react';
import notificationReducer from '../context/slices/notiSlice';
import authReducer from '../context/slices/authSlice';
import AppContext from '../context/AppContext';

const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        notification: useReducer(notificationReducer, null),
        auth: useReducer(authReducer, null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
