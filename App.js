import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import Root from './Root'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  link: httpLink,
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