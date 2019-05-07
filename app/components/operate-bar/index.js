import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { common } from '../../styles/index';

const OperateBarPropsType = {
  label: PropTypes.string,
  leftIcon: PropTypes.children,
  rightIcon: PropTypes.children,
  onPress: PropTypes.function
};

const OperateBarDefaultProps = {
  label: 'label',
  leftIcon: <Icon name='barschart' style={common.fontColorSize()} />,
  rightIcon: <Icon name='right' style={common.fontColorSize()} />,
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

export default class OperateBar extends Component {
  render() {
    const { label, onPress, leftIcon, rightIcon } = this.props;
    return (
      <TouchableOpacity
        style={styles.operate_bar}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View>
          {leftIcon}
          <Text style={styles.label}>{label}</Text>
        </View>
        {rightIcon}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  operate_bar: {
    width: 240,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  label: {
    color: '#3C3C3C',
    fontSize: 16,
    marginLeft: 8
  }
});

PropTypes.OperateBar = OperateBarPropsType;

OperateBar.defaultProps = OperateBarDefaultProps;
