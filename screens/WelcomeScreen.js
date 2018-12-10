import React from 'react';
import { Container, Button, Content, Text } from 'native-base';

export default class WelcomeScreen extends React.Component {
	static navigationOptions = {
    	title: 'Hoş Geldiniz',
  	};

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Content>
          <Button full transparent onPress={() => navigation.navigate('Login')}>
            <Text>Giriş Yap</Text>
          </Button>
          <Button full transparent onPress={() => navigation.navigate('Signup')}>
            <Text>Üye Ol</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
