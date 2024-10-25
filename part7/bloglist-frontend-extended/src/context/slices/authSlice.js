import { useContext } from 'react';
import AppContext from '../AppContext';

export const useAuthContext = () => {
  const { auth } = useContext(AppContext);
  return auth;
};

export const login = user => {
  return { type: 'auth/login', payload: user };
};
export const logout = () => {
  return { type: 'auth/logout' };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'auth/login':
      return action.payload;
    case 'auth/logout':
      return null;
    default:
      return state;
  }
};

export const useAuthValue = () => {
  const { auth } = useContext(AppContext);
  return auth[0];
};

export const useAuthDispatch = () => {
  const { auth } = useContext(AppContext);
  return auth[1];
};

export default authReducer;
