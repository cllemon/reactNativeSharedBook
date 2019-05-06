import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

const DragPropsType = {
  onStartShouldSetPanResponder: PropTypes.func,
  onStartShouldSetPanResponderCapture: PropTypes.func,
  onMoveShouldSetPanResponder: PropTypes.func,
  onMoveShouldSetPanResponderCapture: PropTypes.func,
  onPanResponderTerminationRequest: PropTypes.func,
  onPanResponderGrant: PropTypes.func, // 手势开始响应函数
  onPanResponderRelease: PropTypes.func // 手势结束响应函数
};

const DragDefaultProps = {
  onPanResponderGrant: (evt, gestureState) =>
    console.log(
      'Please attach a method called onPanResponderGrant to this component'
    ),
  onPanResponderRelease: (evt, gestureState) =>
    console.log(
      'Please attach a method called onPanResponderRelease to this component'
    ),
  onStartShouldSetPanResponder: (evt, gestureState) => true,
  onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
  onMoveShouldSetPanResponder: (evt, gestureState) => true,
  onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  onPanResponderTerminationRequest: (evt, gestureState) => true
};

export default class Drag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDrag: false,
      dynamicPosition: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      _panHandlers: null,
      panHandlers: {}
    };
  }

  /**
   * 响应拖拽开始函数
   * @memberof Drag
   */
  _onPanResponderGrant = (evt, gestureState) => {
    Animated.timing(this.state.scale, {
      toValue: 1.2,
      duration: 10,
      useNativeDriver: true
    }).start();
  };

  /**
   * 响应拖拽移动时候，把从触摸操作开始时的累计横纵向路程，映射到dynamicPosition的X,Y
   * @memberof Drag
   */
  _onPanResponderMove = () =>
    Animated.event([
      {},
      {
        dx: this.state.dynamicPosition.x,
        dy: this.state.dynamicPosition.y
      }
    ]);

  /**
   * 完成拖拽（移动位置为中心点）
   * @memberof Drag
   */
  _onPanResponderRelease = (evt, gestureState) => {
    const initPosition = [gestureState.x0, gestureState.y0];
    const lastPositionMove = [gestureState.moveX, gestureState.moveY];

    /** 这里的处理函数交给外界去处理 */
    console.log('done', initPosition, lastPositionMove);
    const boundary =
      lastPositionMove[1] > 200 ||
      (lastPositionMove[1] === 0 && lastPositionMove[0] === 0);
    if (boundary) {
      this.setOriginalLocation();
    } else {
      // this.props.onPanResponderRelease();
      Animated.timing(this.state.scale, {
        toValue: 0.01,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    this.setState({ panHandlers: null });
    /** 这里的处理函数交给外界去处理 */
  };

  /**
   * 设置为原始位置
   */
  setOriginalLocation() {
    this.state.dynamicPosition.setValue({
      x: 0,
      y: 0
    });
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  }

  /**
   * 初始化PanResponder
   *
   * @memberof Drag
   */
  initPanResponder = () => {
    const {
      onStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture,
      onPanResponderTerminationRequest
    } = this.props;
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture,
      onPanResponderTerminationRequest,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: this._onPanResponderMove(),
      onPanResponderRelease: this._onPanResponderRelease
    });
    this.setState({ _panHandlers: _panResponder.panHandlers });
  };

  componentWillMount() {
    this.initPanResponder();
  }

  setPanHandlers() {
    this.setState({
      isOpenDrag: true,
      panHandlers: this.state._panHandlers
    });
  }

  render() {
    const { dynamicPosition, scale, panHandlers, isOpenDrag } = this.state;
    const [translateX, translateY] = [dynamicPosition.x, dynamicPosition.y];
    const transform = {
      zIndex: isOpenDrag ? 10 : 1,
      transform: [{ translateX }, { translateY }, { scale }]
    };
    return (
      <Animated.View style={transform} {...panHandlers}>
        {this.props.children}
      </Animated.View>
    );
  }
}

PropTypes.Drag = DragPropsType;

Drag.defaultProps = DragDefaultProps;
