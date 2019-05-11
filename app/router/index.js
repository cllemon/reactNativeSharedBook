import { createStackNavigator } from 'react-navigation';
import RouteConfigs from './list';

const StackNavigatorConfigs = {
  // initialRouteName: 'Register'
  initialRouteName: 'Desk'
};

export default createStackNavigator(RouteConfigs, StackNavigatorConfigs);
