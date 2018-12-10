import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text, Label } from 'native-base';
import { graphql } from 'react-apollo';
import FormMessage from '../components/FormMessage';
import LOGIN_MUTATION from '../graphql/login';
import { saveToken } from '../utilities';

import "apollo-client";
import "graphql";

class LoginScreen extends React.Component {
	static navigationOptions = {
    	title: 'Giriş',
  	};

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
      emailError: false,
      passwordError: false,
      error: '',
    });
    if (email.length === 0) {
      return this.setState({ emailError: true });
    }

    if (password.length === 0) {
      return this.setState({ passwordError: true });
    }

    const { navigation } = this.props;

    try {
      const { data } = await this.props.login(email, password);
      await saveToken(data.login.token);
      navigation.navigate('Main');
    } catch (e) {
      this.setState({error: e.message});
      // If the error message contains email or password we'll assume that's the error.
      if (/email/i.test(e.message)) {
        this.setState({ emailError: true });
      }
      if (/password/i.test(e.message)) {
        this.setState({ passwordError: true });
      }
    }
  };

  render() {
    const { emailError, passwordError, error } = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <FormMessage message={error} />
            <Item floatingLabel error={emailError}>
              <Label>E-Posta</Label>
              <Input
                onChangeText={email => this.setState({email})}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel error={passwordError}>
              <Label>Şifre</Label>
              <Input
                onChangeText={password => this.setState({password})}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
          </Form>
          <Button block onPress={this.handleSubmit}>
            <Text>Giriş Yap</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default graphql(LOGIN_MUTATION, {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(LoginScreen);