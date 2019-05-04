// import axios from 'axios';
// // import ERRORCODE from './error-code';
// import constance from '../../utils/constance';
// import { isPresence, asyncRead } from '../../plugin/asyncStorage';
// import Toast from 'react-native-root-toast';

// const DEFAULT_OPTIONS = {
//   baseURL: global.__DEV__
//     ? constance.service.DevBaseUrl
//     : constance.service.WWWBaseUrl,
//   timeout: constance.service.Timeout,
//   headers: { 'Content-Type': 'application/json;charset=UTF-8' }
// };

// const instance = axios.create(DEFAULT_OPTIONS);

// instance.interceptors.request.use(
//   async config => {
//     if (isPresence(constance.service.ACCESS_TOKEN)) {
//       const token = await asyncRead(constance.service.ACCESS_TOKEN);
//       config.headers = {
//         access_token: token
//       };
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * 错误处理
//  * @param {Object} data 返回信息
//  * @param {Function} reject
//  * @returns {Promise}
//  *
//  * 注：BaseToast(ERRORCODE(code));
//  *    这里暂时把错误码和错误信息 集成后端
//  */
// function handlerErrorCode(data, reject) {
//   const { code, tips } = data;
//   if (code && code !== 0) {
//     Toast.show(tips.text, { position: Toast.positions.CENTER });
//     return reject(new Error(tips.text));
//   }
// }

// export default function(url, method, queryParams = {}) {
//   const option = {
//     method,
//     url: url + `?ts=${new Date().valueOf()}`
//   };
//   return new Promise((resolve, reject) => {
//     if (method.toUpperCase() === 'GET') {
//       option.params = queryParams;
//     } else {
//       option.data = queryParams;
//     }
//     instance(option)
//       .then(res => {
//         const { data } = res || {};
//         handlerErrorCode(data, reject);
//         resolve(data);
//       })
//       .catch(err => {
//         console.log('请求异常', err);
//         reject(err);
//       });
//   });
// }
