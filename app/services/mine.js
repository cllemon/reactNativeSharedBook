import network from '../plugin/network';
import axios from 'axios';
import Toast from 'react-native-root-toast';

/**
 * 分享
 * @param {Object} data 参数
 * @returns {Promise}
 */
export const share = (data = {}) => {
  return network('user/share', 'PSOT', data);
};

/**
 * 图片上传 (SM.SM) 「废弃-采用本地路径」
 */
export const uploadPicture = data => {
  const options = {
    url: 'https://sm.ms/api/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  };
  return axios(options)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log('图片上传失败：', error);
      Toast.show('上传失败');
    });
};
