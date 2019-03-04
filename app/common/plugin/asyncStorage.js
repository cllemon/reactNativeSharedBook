import { AsyncStorage } from 'react-native';

const tag = 'rn-asyncStorage-library-';

/**
 * 是否存在
 */
export const isPresence = async name => {
  if (!name) return;
  return await asyncRead(name);
};

/**
 * 存数据
 * @param {String} name 键名
 * @param {any} option 键值
 * @returns {Object | Boolean}
 */
export const asyncSave = async (name, option) => {
  if (!name) return;
  if (option instanceof Array || option instanceof Object) {
    option = JSON.stringify(option);
  }
  return await AsyncStorage.setItem(tag + name, option, (error, result) => {
    if (error) {
      return false;
    }
    return result;
  });
};

/**
 * 读数据
 * @param {String} name 键名
 * @returns {Object | Boolean}
 */
export const asyncRead = async name => {
  if (!name) return;
  return await AsyncStorage.getItem(tag + name, (error, result) => {
    if (error) {
      return false;
    }
    return result;
  });
};

/**
 * 删数据
 * @param {String} name 键名
 * @returns {Boolean}
 */
export const asyncDelete = async name => {
  if (!name) return;
  return await AsyncStorage.removeItem(tag + name, error => {
    if (error) {
      return false;
    }
    return true;
  });
};

// 全局变量 使用也是 global.
// global.storage = storage;
