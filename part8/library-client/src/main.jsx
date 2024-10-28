import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import apolloClient from './utils/apolloClient.js';
import { ApolloProvider } from '@apollo/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
