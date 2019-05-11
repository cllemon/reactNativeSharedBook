import React, { Component } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { common } from '../../styles/index';

const ButtonPropsType = {
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  touchStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  onPress: PropTypes.func
};

const ButtonDefaultProps = {
  title: '确 认',
  width: common.screenWidth(0.914)['width'],
  height: 44,
  loading: false,
  disabled: false,
  titleStyle: {}, // title样式
  touchStyle: {}, // touch样式
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

export default class Button extends Component {
  BUTTON_STYLE = () => {
    const { loading, height, width } = this.props;
    return {
      height,
      width,
      backgroundColor: '#5E94FF',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      flexDirection: 'row'
    };
  };

  _onPress = () => {
    const { loading, onPress } = this.props;
    if (loading) return false;
    onPress();
  };

  render() {
    const { loading, title, disabled } = this.props;

    return (
      <TouchableOpacity
        style={this.BUTTON_STYLE()}
        onPress={this._onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {loading && <ActivityIndicator size='small' color='#fff' />}
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

PropTypes.Button = ButtonPropsType;

Button.defaultProps = ButtonDefaultProps;
