import React from 'react';
import { Container, Button, Content, Text } from 'native-base';

export default class Welcome extends React.Component {
	static navigationOptions = {
    	title: 'Welcome',
  	};

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Content>
          <Button full transparent onPress={() => navigation.navigate('Login')}>
            <Text>Sign In</Text>
          </Button>
          <Button full transparent onPress={() => navigation.navigate('Signup')}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
