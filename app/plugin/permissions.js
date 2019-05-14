import { PermissionsAndroid } from 'react-native';
import { common } from '../styles/index';
import { PERMISSION_CODE } from './enume';

/**
 * Android 权限
 * @param {String} permissionType 权限类型
 * @param {Object} rationale 配置
 * @returns {Number} 权限结果 0：拒绝 1：同意 -1：拒绝且不再询问
 */
export const requestPermission = async (permissionType, rationale = {}) => {
  try {
    const granted = await PermissionsAndroid.request(permissionType, rationale);
    const RESULT = PermissionsAndroid.RESULTS;
    switch (granted) {
      case RESULT.GRANTED:
        return PERMISSION_CODE[2];
      case RESULT.DENIED:
        return PERMISSION_CODE[1];
      case RESULT.NEVER_ASK_AGAIN:
        return PERMISSION_CODE[0];
      default:
        return null;
    }
  } catch (error) {
    console.error(`授权处理异常${error}`);
  }
};

/**
 * 授权
 */
export const authorization = async (permission, rationale = {}) => {
  try {
    const PERMISSIONTYPE = PermissionsAndroid.PERMISSIONS[permission];
    const checkResult = await PermissionsAndroid.check(PERMISSIONTYPE);
    if (checkResult) return PERMISSION_CODE[2];
    return await requestPermission(PERMISSIONTYPE, rationale);
  } catch (error) {
    console.log('查询授权状态异常：', error);
  }
};
