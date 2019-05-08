import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';

const TemplatePropsType = {
  title: PropTypes.string,
  left: PropTypes.children,
  right: PropTypes.children,
  onLeftPress: PropTypes.function,
  onRightPress: PropTypes.function
};

const TemplateDefaultProps = {
  title: '',
  left: <Icon name='arrowleft' style={common.fontColorSize()} />,
  right: null,
  onLeftPress: () =>
    console.log('Please attach a method called onLeftPress to this component'),
  onRightPress: () =>
    console.log('Please attach a method called onRightPress to this component')
};

export default class Template extends Component {
  render() {
    return <View />;
  }
}

PropTypes.Template = TemplatePropsType;

Template.defaultProps = TemplateDefaultProps;
