import network from '../plugin/network';

/**
 * 书柜页 - 藏书列表
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookcaseList = (data = {}) => {
  return network('api/bookcase/list', 'GET', data);
};

/**
 * 书柜页 - 移除藏书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const removeBookcase = (data = {}) => {
  return network('api/bookcase/delete', 'POST', data);
};

/**
 * 书柜页 - 移除藏书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const removeBookcase = (data = {}) => {
  return network('api/bookcase/add', 'POST', data);
};
