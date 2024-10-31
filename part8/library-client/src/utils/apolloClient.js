import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(window.localStorage.getItem('login-user'));
  let token = user?.token;
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : null },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
