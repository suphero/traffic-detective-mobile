import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import { graphql } from 'react-apollo';
import FormMessage from '../components/FormMessage';
import SIGNUP_MUTATION from '../graphql/signup';
import { saveToken } from '../utilities';

class Register extends React.Component {
	static navigationOptions = {
    	title: 'Register',
  	};

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      error: ''
    };
  }

  handleSubmit = async() => {
    const { email, password, confirmPassword } = this.state;
    this.setState({
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      error: '',
    });
    if (email.length === 0) {
      return this.setState({ emailError: true });
    }

    if (password.length === 0) {
      return this.setState({ passwordError: true });
    }

    if (confirmPassword.length === 0) {
      return this.setState({ confirmPasswordError: true });
    }

    if (password !== confirmPassword) {
      return this.setState({ passwordError: true, confirmPasswordError: true });
    }

    const { navigation } = this.props;

    try {
      const { data } = await this.props.signup(email, password)
      if (!data.signup.success) {
        throw new Error(data.signup.message);
      }
      navigation.navigate('Login');
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
    const { emailError, passwordError, confirmPasswordError, error } = this.state;

    return (
      <Container>
        <Content>
          <Form>
		        <FormMessage message={error} />
            <Item error={emailError}>
              <Input
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item error={passwordError}>
              <Input
                placeholder="Password"
                onChangeText={password => this.setState({password})}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
            <Item last error={confirmPasswordError}>
              <Input
                placeholder="Confirm Password"
                onChangeText={confirmPassword => this.setState({confirmPassword})}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
          </Form>
          <Button full onPress={this.handleSubmit}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default graphql(SIGNUP_MUTATION, {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(Register);
