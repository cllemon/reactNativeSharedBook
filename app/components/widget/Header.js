import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';

const HeaderPropsType = {
  title: PropTypes.string,
  left: PropTypes.children,
  right: PropTypes.children,
  onLeftPress: PropTypes.function,
  onRightPress: PropTypes.function,
  navigation: PropTypes.object
};

const HeaderDefaultProps = {
  title: '',
  left: <Icon name='arrowleft' style={common.fontColorSize()} />,
  right: null,
  onLeftPress: null,
  onRightPress: () =>
    console.log('Please attach a method called onRightPress to this component')
};

const HEADER_STYLE = Object.assign(
  {},
  common.screenWidth(),
  common.screenHeight(44),
  common.layout_flex('space-between'),
  common.bgc(),
  common.pVerticalHorizontal(0, 16),
  common.iosHeaderMarginTop()
);

export default class Header extends Component {
  _onLeftPress = () => {
    if (this.props.onLeftPress) {
      return this.props.onLeftPress();
    }
    this.props.navigation.goBack();
  };

  _renderLeft = () => {
    return (
      <TouchableOpacity onPress={this._onLeftPress} activeOpacity={0.8}>
        {this.props.left}
      </TouchableOpacity>
    );
  };

  _renderRight = () => {
    if (this.props.right) {
      return (
        <TouchableOpacity onPress={this.props.onRightPress} activeOpacity={0.8}>
          {this.props.right}
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  render() {
    return (
      <View style={{ zIndex: variable.$zIndex_header }}>
        <StatusBar
          hidden={false}
          backgroundColor={variable.$main_color_white}
          barStyle={'dark-content'}
        />
        <View style={HEADER_STYLE}>
          {this._renderLeft()}
          <Text style={common.h()}>{this.props.title}</Text>
          {this._renderRight()}
        </View>
      </View>
    );
  }
}

PropTypes.Header = HeaderPropsType;

Header.defaultProps = HeaderDefaultProps;
