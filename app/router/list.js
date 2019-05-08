/**
 * 路由映射表
 */
import { isFunction, isObject } from 'lodash';
import Desk from './drawer';
import Detail from '../view/detail/index';
import Library from '../view/library/index';
import Login from '../view/login/index';
import PersonalInformation from '../view/personal-information/index';
import ReadingRecord from '../view/reading-record/index';
import Search from '../view/search/index';
import Setting from '../view/setting/index';
import Share from '../view/share/index';
import List from '../view/list/index';
import Register from '../view/register/index';

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
  Detail: getNavigationOptions(Detail),
  Library: getNavigationOptions(Library),
  Login: getNavigationOptions(Login),
  PersonalInformation: getNavigationOptions(PersonalInformation),
  ReadingRecord: getNavigationOptions(ReadingRecord),
  Search: getNavigationOptions(Search),
  Setting: getNavigationOptions(Setting),
  Share: getNavigationOptions(Share),
  List: getNavigationOptions(List),
  Register: getNavigationOptions(Register)
};
