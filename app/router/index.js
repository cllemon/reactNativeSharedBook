import { createStackNavigator } from 'react-navigation';
import RouteConfigs from './list';

const StackNavigatorConfigs = {
  initialRouteName: 'Desk'
};

export default createStackNavigator(RouteConfigs, StackNavigatorConfigs);
