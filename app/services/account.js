import network from '../plugin/network';

/**
 * 注册
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const register = (data = {}) => {
  return network('user/register', 'POST', data);
};

/**
 * 登录
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const login = (data = {}) => {
  return network('user/login', 'POST', data);
};

/**
 * 找回密码
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const reset = (data = {}) => {
  return network('user/reset', 'POST', data);
};

/**
 * 重置密码验证
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const verify = (data = {}) => {
  return network('user/verify', 'POST', data);
};
