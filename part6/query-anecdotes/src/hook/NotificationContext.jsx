import { useReducer, createContext, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'noti/vote':
      return `anecdote : "${action.payload}" voted `;
    case 'noti/create':
      return `anecdote : "${action.payload}" created `;
    case 'noti/error':
      return action.payload;
    case 'noti/clear':
    default:
      return '';
  }
};

export const clearAction = () => {
  return {
    type: 'noti/clear',
  };
};

export const voteAction = note => {
  return {
    type: 'noti/vote',
    payload: note.content,
  };
};

export const createAction = note => {
  return {
    type: 'noti/create',
    payload: note.content,
  };
};

export const errorAction = message => {
  return {
    type: 'noti/error',
    payload: message,
  };
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [noti, notiDispatch] = useReducer(notificationReducer, '');
  return (
    <NotificationContext.Provider value={[noti, notiDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useNotificationValue = () => {
  const notiAndDispatch = useContext(NotificationContext);
  return notiAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notiAndDispatch = useContext(NotificationContext);
  return notiAndDispatch[1];
};
