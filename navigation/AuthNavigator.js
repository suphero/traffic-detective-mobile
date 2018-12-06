import { createStackNavigator } from 'react-navigation';

import Welcome from '../screens/WelcomeScreen';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';

export default createStackNavigator({
  Welcome: Welcome,
  Login: Login,
  Signup: Signup
}, {
  initialRouteName: 'Welcome'
});