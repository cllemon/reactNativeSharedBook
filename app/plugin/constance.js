import moment from 'moment';

export default {
  YMD: val => moment(val).format('YYYY-MM-DD'),
  YMDHM: val => moment(val).format('YYYY-MM-DD HH:mm'),
  DEFAULT_HEAD_URL: require('../assets/images/default_head.png'),
  HEAD_URL_KEY: 'head_url_key',
  WWW: 'http://47.99.144.152:6010/api/',
  DEV: 'http://127.0.0.1:6010/api/',
  SM_SM: 'https://sm.ms/api/',
  ACCESS_TOKEN: 'access_token',
  TIMEOUT: 10000,
  ERROR_TIPS: '请求失败'
};
