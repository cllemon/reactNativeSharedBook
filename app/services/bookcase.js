import network from '../plugin/network';

/**
 * 书柜页 - 藏书列表
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookcaseList = (data = {}) => {
  return network('bookcase/list', 'POST', data);
};

/**
 * 书柜页 - 移除藏书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const removeBookcase = (data = {}) => {
  return network('bookcase/delete', 'POST', data);
};

/**
 * 书柜页 - 移除藏书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const addBookcase = (data = {}) => {
  return network('bookcase/add', 'POST', data);
};
