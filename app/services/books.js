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
 * 获取图书详情
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookDetail = (data = {}) => {
  return network('books/detail', 'GET', data);
};

/**
 * 获取推荐图书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getBookRecommend = (data = {}) => {
  return network('books/recommend', 'GET', data);
};

/**
 * 获取推荐图书
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getSearchList = (data = {}) => {
  return network('books/searchList', 'GET', data);
};
