import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { setContext } from 'apollo-link-context';
import Root from './Root';
import { getToken } from './utilities';

const httpLink = new HttpLink({ uri: 'https://traffic-monster-prod.heroku.harunsokullu.com/graphql' })
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  authLink,
  httpLink
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    )
  }
}