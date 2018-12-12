import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { graphql } from 'react-apollo';
import FormMessage from './FormMessage';
import SIGNUP_MUTATION from '../graphql/signup';
import { saveToken } from '../utilities';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
  }

  handleSubmit = async() => {
    const { email, password, confirmPassword } = this.state;
    this.setState({
      error: '',
    });
    if (email.length === 0) {
      return this.setState({ error: 'E-Posta boş olamaz' });
    }

    if (password.length === 0) {
      return this.setState({ error: 'Şifre boş olamaz' });
    }

    if (confirmPassword.length === 0) {
      return this.setState({ error: 'Şifre Tekrarı boş olamaz' });
    }

    if (password !== confirmPassword) {
      return this.setState({ error: 'Girilen şifreler farklı' });
    }

    const { navigation } = this.props;

    try {
      const { data } = await this.props.signup(email, password)
      if (!data.signup.success) {
        throw new Error(data.signup.message);
      }
      await saveToken(data.signup.token);
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

        <FormLabel>Şifre Tekrarı</FormLabel>
        <FormInput
          onChangeText={confirmPassword => this.setState({confirmPassword})}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        <Button
          title='Üye Ol'
          onPress={this.handleSubmit}
          />
      </View>
    );
  }
}

export default graphql(SIGNUP_MUTATION, {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(Signup);
