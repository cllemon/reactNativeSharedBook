import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { common } from '../../styles/index';

const TitleBarPropsType = {
  title: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.function
};

const TitleBarDefaultProps = {
  title: '',
  label: '',
  onPress: () =>
    console.log('Please attach a method called onPress to this component')
};

export default class TitleBar extends Component {
  render() {
    const { title, label, onPress } = this.props;
    return (
      <View style={styles.title_bar}>
        <Text style={styles.title_bar_h}>{title}</Text>
        <Text style={styles.title_bar_operate} onPress={onPress}>
          {label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /** title */
  title_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...common.pVerticalHorizontal(12, 15)
  },
  title_bar_h: {
    ...common.h(common.miniSreen ? 16 : 20, '#3C3C3C')
  },
  title_bar_operate: {
    ...common.fontColorSize('#5E94FF', 14)
  }
});

PropTypes.TitleBar = TitleBarPropsType;

TitleBar.defaultProps = TitleBarDefaultProps;
