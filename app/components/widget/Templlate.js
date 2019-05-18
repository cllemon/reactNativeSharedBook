import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { common, variable } from '../../styles/index';

const InputPropsType = {
  title: PropTypes.string,
  onRightPress: PropTypes.function
};

const InputDefaultProps = {
  title: '',
  onRightPress: () =>
    console.log('Please attach a method called onRightPress to this component')
};

export default class Input extends Component {
  render() {
    return <View />;
  }
}

PropTypes.Input = InputPropsType;

Input.defaultProps = InputDefaultProps;
