import moment from 'moment';

export const themes = (color = '#fff') => ({
  tan: {
    body: {
      '-webkit-user-select': 'none',
      'user-select': 'none',
      'background-color': color
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
