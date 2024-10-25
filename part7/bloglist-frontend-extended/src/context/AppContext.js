import { createContext } from 'react';

const AppContext = createContext({
  notification: null,
  auth: null,
});

export default AppContext;
