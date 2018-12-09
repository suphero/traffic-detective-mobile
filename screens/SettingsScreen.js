import React from 'react';
import { View, Button, Text } from 'native-base';
import { removeToken } from '../utilities';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View>
        <Button block onPress={this.handleSignout}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    )
  }

  handleSignout = async () => {
    const { navigation } = this.props;
    await removeToken();
    navigation.navigate('Auth');
  };
}
