import { useContext } from 'react';
import AppContext from '../AppContext';

export const createNoti = (payload) => {
  console.log(payload);
  return {
    type: 'noti/create',
    payload,
  };
};

export const clearNoti = () => {
  return {
    type: 'noti/clear',
  };
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'noti/create':
      return action.payload;
    case 'noti/clear':
      return null;
    default:
      return state;
  }
};

export const useNotificationValue = () => {
  const { notification } = useContext(AppContext);
  return notification[0];
};

export const useNotificationDispatch = () => {
  const { notification } = useContext(AppContext);
  return notification[1];
};

export default notificationReducer;
