import React from 'react'
import { graphql } from 'react-apollo'
import VERIFY_TOKEN_MUTATION from '../graphql/verifyToken';
import { getToken, removeToken } from '../utilities';
import Loading from '../components/Loading';

import "apollo-client";
import "graphql";

class LoadingScreen extends React.Component {
  async componentDidMount() {
    const { navigation } = this.props;

    try {
      const token = await getToken();
      if (!token) {
        return navigation.navigate('Auth');
      }
      const { data } = await this.props.verify_token(token);
      const isTokenValid = data.verify_token.success;
      if (!isTokenValid) await removeToken();
      navigation.navigate(isTokenValid ? 'Main' : 'Auth');
    } catch (error) {
      await removeToken();
      return navigation.navigate('Auth');
    }
  }

  render() {
    return <Loading/>
  }
}

export default graphql(VERIFY_TOKEN_MUTATION, {
    props: ({ mutate }) => ({
      verify_token: (token) => mutate({ variables: { token } }),
    }),
  },
)(LoadingScreen);