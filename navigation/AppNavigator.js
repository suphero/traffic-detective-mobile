import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import Loading from '../screens/LoadingScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthNavigator,
  Loading: Loading
},{
  initialRouteName: 'Loading'
});