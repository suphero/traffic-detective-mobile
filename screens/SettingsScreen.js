import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { removeToken } from '../utilities';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Ayarlar',
  };

  render() {
    return (
      <View>
        <Button
          raised
          icon={{name: 'power-settings-new'}}
          title='Çıkış Yap'
          onPress={this.handleSignout}
          />
      </View>
    )
  }

  handleSignout = async () => {
    const { navigation } = this.props;
    await removeToken();
    navigation.navigate('Auth');
  };
}
