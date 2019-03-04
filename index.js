/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { globalOptions } from './global';

globalOptions(global, GLOBAL);

AppRegistry.registerComponent(appName, () => App);
