import { createDrawerNavigator } from 'react-navigation';
import { common } from '../styles/index';
import Mine from '../view/mine/index';
import Desk from '../view/desk/index';

const drawerRouteConfigs = {
  Desk
};

const DrawerNavigatorConfig = {
  drawerWidth: common.screenWidth(0.64)['width'],
  contentComponent: Mine
};

export default createDrawerNavigator(drawerRouteConfigs, DrawerNavigatorConfig);
