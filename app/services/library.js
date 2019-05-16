import network from '../plugin/network';

/**
 * 书城 - 轮播
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getCarousel = (data = {}) => {
  return network('carousel/list', 'GET', data);
};

/**
 * 书城 - 获取一级分类
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const getCategories = (data = {}) => {
  return network('categories/list', 'GET', data);
};
