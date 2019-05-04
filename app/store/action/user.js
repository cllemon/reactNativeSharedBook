import { GET_USER_INFO } from '../types/user';
import { login } from '../../services/account';
import { asyncSave } from '../../plugin/asyncStorage';
import constance from '../../utils/constance';

/**
 * 处理登录操作
 * @param {Object} params 形参
 * @param {Object} userInfo 用户信息
 * @param {String} access_token token
 * @param {Function} asyncSave 异步存储
 * @returns {Function} 触发对应Type - reducer
 */
export const handlerLogin = params => {
  return async dispatch => {
    const userInfo = await login(params);
    const { access_token } = userInfo.data;
    await asyncSave(constance.service.ACCESS_TOKEN, access_token);
    dispatch({
      type: GET_USER_INFO,
      payload: userInfo.data
    });
  };
};
