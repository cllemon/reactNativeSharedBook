import moment from 'moment';

export default {
  YMD: val => moment(val).format('YYYY-MM-DD'),
  YMDHM: val => moment(val).format('YYYY-MM-DD HH:mm')
};

// const enume = {
//   UserType: {
//     ordinary: 1,
//     VIP: 2
//   },
//   TerminalType: {
//     IOS: 1,
//     ANDROID: 2,
//     WEB: 3
//   },
//   OSSUrl: {
//     url: 'https://oss.example.com/'
//   },
//   BucketType: {
//     PUBLIC: 'example-public-001',
//     PRIVATE: 'example-private-001'
//   },
//   thirdParty: {
//     QQ: 0,
//     SINA: 1,
//     WECHAT: 2
//   }
// };

// const value = {
//   mobilePhone: '19805815940',
//   landline: '0571-12345678',
//   address: '121321312313',
//   windowHeight: height,
//   windowWidth: width,
//   pageSize: 10
// };

// const service = {
//   WWWBaseUrl: 'http://47.99.144.152:7001/api/ebook',
//   DevBaseUrl: 'http://127.0.0.1:7001/api/ebook',
//   Timeout: 1000 * 10,
//   EnvironmentType: {
//     release: 'www',
//     test: 'test',
//     dev: 'dev'
//   },
//   ACCESS_TOKEN: 'access_token'
// };

// export default {
//   enume,
//   value,
//   service
// };
