import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
import constance from '../common/utils/constance';

const DrawerPropsType = {
  visible: PropTypes.bool,
  direction: PropTypes.string,
  TouchMaskClose: PropTypes.func,

  width: PropTypes.number,
  height: PropTypes.number,

  duration: PropTypes.number,

  children: PropTypes.element
};

const DrawerDefaultProps = {
  visible: false,
  direction: 'right',
  TouchMaskClose: () => console.log('Please attach a method to this component'),

  width: constance.value.windowWidth * 0.6,
  height: constance.value.windowHeight
};

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(0) // 透明度初始值设为0
    };
  }

  /**
   * 钩子 - 更新
   */
  componentDidUpdate() {
    this.props.visible ? this.open() : this.close();
  }

  /**
   * 打开抽屉
   */
  open = () => {
    Animated.timing(this.state.xPosition, {
      toValue: constance.value.windowWidth * 0.6,
      duration: 600,
      easing: Easing.inOut(Easing.cubic)
    }).start();
  };

  /**
   * 关闭抽屉
   */
  close = () => {
    Animated.timing(this.state.xPosition, {
      toValue: -constance.value.windowWidth * 0.6,
      duration: 400,
      easing: Easing.inOut(Easing.cubic)
    }).start();
  };

  // handlerOverlayStyle = () => {

  // };

  render() {
    const { visible, children } = this.props;
    if (visible) {
      return (
        <View style={styles.wraper}>
          <TouchableWithoutFeedback onPress={this.props.TouchMaskClose}>
            <View style={styles.mask_content} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.overlay,
              { transform: [{ translateX: this.state.xPosition }] }
            ]}
          >
            {children}
          </Animated.View>
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  wraper: {
    position: 'absolute',
    top: 0,
    left: 0
    // height: constance.value.windowHeight,
    // width: constance.value.windowWidth
  },

  mask_content: {
    height: constance.value.windowHeight,
    width: constance.value.windowWidth,
    backgroundColor: 'rgb(0,0,0)',
    opacity: 0.6,
    zIndex: 1999,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: -constance.value.windowWidth * 0.6,
    height: constance.value.windowHeight,
    width: constance.value.windowWidth * 0.6,
    backgroundColor: '#fff',
    zIndex: 2000
  }
});

PropTypes.Drawer = DrawerPropsType;

Drawer.defaultProps = DrawerDefaultProps;
