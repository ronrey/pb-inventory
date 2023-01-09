import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import apolloClient from './constants/apollo';
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const theme = createTheme({
  palette: {
    //mode: 'dark',
    primary: {
      main: blue[600],
    },
    secondary: {
      main: blue[900],
    },
  },
});
const httpLink = createHttpLink({
  uri: apolloClient,
});
const authLink = setContext((_, { headers }) => {
  const auth_token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: auth_token ? `Bearer ${auth_token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: apolloClient,
  cache: new InMemoryCache(),
});
if (localStorage.getItem('auth_token')) {
  localStorage.removeItem('auth_token');
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
