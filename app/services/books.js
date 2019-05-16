import network from '../plugin/network';

/**
 * 获取图书二级分类列表
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getSubclass = (data = {}) => {
  return network('categories/subclass', 'GET', data);
};

/**
 * 获取图书列表
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookList = (data = {}) => {
  return network('books/list', 'POST', data);
};

/**
 * 获取图书列表
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookDetail = (data = {}) => {
  return network('books/detail', 'GET', data);
};
