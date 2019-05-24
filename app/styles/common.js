/**
 * 全局通用布局
 */

import { Dimensions, Platform } from 'react-native';
import attribute from './attribute.js';

const { height, width } = Dimensions.get('window');

const IOS = Platform.OS === 'ios';

const IphoneX = () => {
  return (
    IOS &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    height === 812 &&
    width === 375
  );
};

export default {
  ...attribute,

  ios: IOS,

  isIphoneX: IphoneX,

  iosHeaderMarginTop: () => {
    if (IOS) return { marginTop: IphoneX() ? 34 : 20 };
  },

  screenWidth: (percentage = 1) => ({
    width: percentage > 1 ? percentage : percentage * width
  }),

  screenHeight: (percentage = 1) => ({
    height: percentage > 1 ? percentage : percentage * height
  }),

  layout_flex: (justify = 'center', align = 'center', direction = 'row') => ({
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align
  }),

  layout_flex_middle: () => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }),

  layout_position_middle: () => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {
        translateX: '-50%',
        translateY: '-50%'
      }
    ]
  }),

  shadow: (elevation = 1, ios) =>
    Platform.select({
      ios,
      android: {
        elevation: elevation
      }
    })
};
