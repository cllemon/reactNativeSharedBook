/**
 * 路由映射表
 */
import { isFunction, isObject } from 'lodash';
import Desk from './drawer';
import Library from '../view/library/index';
import Search from '../view/search/index';

const DEFAULT_OPTIONS = {
  header: null,
  gesturesEnable: true
};

const getNavigationOptions = (screen, options = {}) => ({
  screen,
  navigationOptions: navigator => ({
    ...DEFAULT_OPTIONS,
    ...(isFunction(options)
      ? options(navigator)
      : isObject(options)
      ? options
      : {})
  })
});

export default {
  Desk: getNavigationOptions(Desk),
  Library: getNavigationOptions(Library),
  Search: getNavigationOptions(Search)
};
