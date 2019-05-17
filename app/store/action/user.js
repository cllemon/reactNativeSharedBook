import { GET_USER_INFO } from '../types/user';
import { login } from '../../services/account';
import { asyncSave, asyncRead } from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';

/**
 * 处理登录操作 - 获取用户信息
 * @param {Object} params 形参
 * @param {Object} userInfo 用户信息
 * @param {String} access_token token
 * @param {Function} asyncSave 异步存储
 * @returns {Function} 触发对应Type - reducer
 */
export const handlerLogin = params => {
  return async dispatch => {
    try {
      dispatch({
        type: GET_USER_INFO,
        payload: { loading: true }
      });
      const userInfo = await login(params);
      if (userInfo) {
        // const head_url = await asyncRead(constance.HEAD_URL_KEY);
        // userInfo.avatar_url = head_url;
        await asyncSave(constance.USER_INFO, JSON.stringify(userInfo));
      }
      dispatch({
        type: GET_USER_INFO,
        payload: userInfo
      });
    } catch (error) {
      console.log('登录拉取用户信息错误', error);
    } finally {
      dispatch({
        type: GET_USER_INFO,
        payload: { loading: false }
      });
    }
  };
};
