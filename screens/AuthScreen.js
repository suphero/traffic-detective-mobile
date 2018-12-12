import React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default class AuthScreen extends React.Component {
	static navigationOptions = {
    title: 'Hoş Geldiniz',
  };

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render () {
    const buttons = ['Giriş', 'Üyelik']
    const { selectedIndex } = this.state;

    return (
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        {this.renderScreen()}
      </View>
    )
  }

  renderScreen() {
    const { selectedIndex } = this.state;
    if (selectedIndex === 0) {
      return <Login navigation={this.props.navigation}/>;
    } else {
      return <Signup navigation={this.props.navigation}/>;
    }
  }
}
