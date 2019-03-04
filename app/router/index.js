/**
 * view 层
 */
import { createStackNavigator } from 'react-navigation';
import LoginView from '../view/login/index';
import SearchView from '../view/search/index';
import TabView from './config/tab.js';
import WelcomeView from '../view/welcome/index';
import RegisterAccount from '../view/register-account/index';
import BookList from '../view/book-list/index';
import DetailView from '../view/detail/index';
import OrderView from '../view/order/index';

const RouteConfigs = {
  ViewTab: {
    screen: TabView,
    navigationOptions: ({ navigation }) => ({
      header: null,
      gesturesEnable: true
    })
  },
  LoginView: {
    screen: LoginView,
    navigationOptions: ({ navigation }) => ({
      header: null,
      title: '登录',
      gesturesEnable: true
    })
  },
  SearchView: {
    screen: SearchView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '搜索页',
      gesturesEnable: true
    })
  },
  WelcomeView: {
    screen: WelcomeView
  },
  RegisterAccount: {
    screen: RegisterAccount,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '注册页',
      gesturesEnable: true
    })
  },
  BookList: {
    screen: BookList,
    navigationOptions: ({ navigation }) => ({
      header: null,
      title: '列表页',
      gesturesEnable: true
    })
  },
  DetailView: {
    screen: DetailView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '详情',
      gesturesEnable: true
    })
  },
  OrderView: {
    screen: OrderView,
    navigationOptions: ({ navigation }) => ({
      header: null,
      title: '订单页',
      gesturesEnable: true
    })
  }
};

const StackNavigatorConfigs = {
  initialRouteName: 'ViewTab'
};

export default (NavigatorContaniner = createStackNavigator(
  RouteConfigs,
  StackNavigatorConfigs
));
