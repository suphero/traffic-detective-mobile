import React from 'react'
import { graphql } from 'react-apollo'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import VERIFY_TOKEN_MUTATION from '../graphql/verifyToken';
import { getToken, removeToken } from '../utilities';

import "apollo-client";
import "graphql";

class Loading extends React.Component {
  async componentDidMount() {
    const { navigation } = this.props;

    try {
      const token = await getToken();
      if (!token) {
        return navigation.navigate('Auth');
      }
      const { data } = await this.props.verify_token(token);
      const isTokenValid = data.verify_token.success;
      if (!isTokenValid) removeToken();
      navigation.navigate(isTokenValid ? 'Main' : 'Auth');
    } catch (error) {
      removeToken();
      return navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default graphql(VERIFY_TOKEN_MUTATION, {
    props: ({ mutate }) => ({
      verify_token: (token) => mutate({ variables: { token } }),
    }),
  },
)(Loading);