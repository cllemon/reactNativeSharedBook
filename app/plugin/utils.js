import moment from 'moment';
import REACTNATIVEFS from 'react-native-fs';

export const themes = (color = '#fff') => ({
  tan: {
    body: {
      '-webkit-user-select': 'none',
      'user-select': 'none',
      'background-color': color,
      'font-size': 30
    }
  }
});

export const createBatchObject = (count = 0) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({});
  }
  return list;
};

export const getAMPMNowStr = () => {
  moment.locale('zh-cn', {
    meridiem: function(hour, minute, isLowercase) {
      if (hour < 9) {
        return '早上';
      } else if (hour < 11 && minute < 30) {
        return '上午';
      } else if (hour < 13 && minute < 30) {
        return '中午';
      } else if (hour < 18) {
        return '下午';
      } else {
        return '晚上';
      }
    }
  });
  return moment().format('A');
};

/**
 * Android 文件处理 - 生成本地文件路径
 * @param {String} ABSOLUTEPATH 文档目录的绝对路径
 */
export const generateLocalPath = async (url, format) => {
  try {
    const ABSOLUTEPATH = common.ios
      ? REACTNATIVEFS.LibraryDirectoryPath
      : REACTNATIVEFS.ExternalDirectoryPath;
    const STORAGEPATH = `${ABSOLUTEPATH}/${Date.now()}.${format}`;
    const { statusCode } = await REACTNATIVEFS.downloadFile({
      fromUrl: url,
      toFile: STORAGEPATH
    }).promise;
    if (statusCode === 200) return `file://${STORAGEPATH}`;
    return false;
  } catch (error) {
    console.error('生成本地路径异常', error);
  }
};
