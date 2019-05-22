import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const ReadOperatePropsType = {
  visible: PropTypes.bool,
  children: PropTypes.object
};

const ReadOperateDefaultProps = {
  visible: false,
  children: null
};

export default class ReadOperate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.visible) {
        this.show();
      } else {
        this.hide();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show = () => {
    const { timing, sequence } = Animated;
    sequence([
      timing(this.state.fadeValue, {
        toValue: 1,
        duration: 1
      })
    ]).start();
  };

  hide = () => {
    const { timing, sequence } = Animated;
    sequence([
      timing(this.state.fadeValue, {
        toValue: 0,
        duration: 10
      })
    ]).start();
  };

  render() {
    return (
      <Animated.View style={{ opacity: this.state.fadeValue }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

PropTypes.ReadOperate = ReadOperatePropsType;

ReadOperate.defaultProps = ReadOperateDefaultProps;
