import Toast from 'react-native-root-toast';

/**
 * @params duration 显示时长
 * @params position [Number] 显示位置(距顶部像素，0表示居中)
 * @params hideOnPress 点击消失
 * @params delay The delay duration before toast start appearing on screen.
 * @params onShown toast出现回调（动画结束时)
 * @params onHidden toast隐藏回调（动画结束时）
 */
export const BaseToast = (message, {
    duration = 2000,
    position = 0,
    appearCb = () => {},
    disappearCb = () => {}
  }) => {
  const options = {
    duration: duration,
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 50,
    onShown: appearCb,
    onHidden: disappearCb,
  };
  Toast.show(message, options);
}
