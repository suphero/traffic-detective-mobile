import { createStackNavigator } from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';

export default createStackNavigator({
  Main: AuthScreen,
});