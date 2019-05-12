import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { common, variable } from '../../styles/index';

const HollowLineHeadingPropsType = {
  title: PropTypes.string
};

const HollowLineHeadingDefaultProps = {
  title: ''
};

export default class HollowLineHeading extends Component {
  render() {
    return (
      <View style={styles.hollow}>
        <View style={styles.line} />
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hollow: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 17,
    ...common.screenWidth()
  },
  line: {
    height: 1,
    ...common.screenWidth(780 / 812),
    ...common.bgc('#EEEEEE')
  },
  title: {
    zIndex: variable.$zIndex_normal,
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    marginTop: -7,
    paddingHorizontal: common.screenWidth(60 / 812)['width'],
    ...common.bgc()
  }
});

PropTypes.HollowLineHeading = HollowLineHeadingPropsType;

HollowLineHeading.defaultProps = HollowLineHeadingDefaultProps;
