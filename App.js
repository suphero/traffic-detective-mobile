import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { onError } from "apollo-link-error";
import Root from './Root'

const httpLink = new HttpLink({ uri: 'http://192.168.1.244:3000/graphql' })
const errorLink = onError(({ networkError }) => {
  // if (networkError.statusCode === 401) {
  //   logout();
  // }
  console.log(networkError);
});
const link = errorLink.concat(httpLink);

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