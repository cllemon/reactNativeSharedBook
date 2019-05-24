import moment from 'moment';

/**
 * 异步存储 key
 */
const ASYNC_STORAGE = {
  HEAD_URL_KEY: 'HEAD_URL_KEY', // 用户头像缓存信息，持久保存
  USER_INFO: 'USER_INFO' // 用户信息
};

export default {
  ...ASYNC_STORAGE,
  YMD: val => moment(val).format('YYYY-MM-DD'),
  YMDHM: val => moment(val).format('YYYY-MM-DD HH:mm'),
  DEFAULT_HEAD_URL: require('../assets/images/default_head.png'),
  WWW: 'http://47.99.144.152:7001/api/',
  DEV: 'http://127.0.0.1:6010/api/',
  SM_SM: 'https://sm.ms/api/',
  ACCESS_TOKEN: 'access_token',
  TIMEOUT: 10000,
  ERROR_TIPS: '请求失败'
};
