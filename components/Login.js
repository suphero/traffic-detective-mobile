import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { graphql } from 'react-apollo';
import FormMessage from './FormMessage';
import LOGIN_MUTATION from '../graphql/login';
import { saveToken } from '../utilities';

import "apollo-client";
import "graphql";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
	    error: ''
    };
  }

  handleSubmit = async () => {
    const { email, password } = this.state;
    this.setState({
      error: '',
    });
    if (email.length === 0) {
      return this.setState({ error: 'E-Posta boş olamaz' });
    }

    if (password.length === 0) {
      return this.setState({ error: 'Şifre boş olamaz' });
    }

    const { navigation } = this.props;

    try {
      const { data } = await this.props.login(email, password);
      await saveToken(data.login.token);
      navigation.navigate('Main');
    } catch (e) {
      this.setState({error: e.message});
    }
  };

  render() {
    const { error } = this.state;

    return (
      <View>
        <FormMessage message={error} />

        <FormLabel>E-Posta</FormLabel>
        <FormInput
          onChangeText={email => this.setState({email})}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormLabel>Şifre</FormLabel>
        <FormInput
          onChangeText={password => this.setState({password})}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        <Button
          icon={{name: 'exit-to-app'}}
          title='Giriş Yap'
          onPress={this.handleSubmit}
          />
      </View>
    );
  }
}

export default graphql(LOGIN_MUTATION, {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(Login);