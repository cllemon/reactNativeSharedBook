import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { common, variable } from '../../styles/index';

const LoadingPropsType = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.object
};

const LoadingDefaultProps = {
  title: '加载中...',
  style: {},
  visible: false
};

export default class Loading extends Component {
  render() {
    if (this.props.visible) {
      return (
        <View style={styles.loading}>
          <View style={styles.content}>
            <ActivityIndicator size='small' color='#fff' />
            {Boolean(this.props.title) && (
              <Text style={[common.fontColorSize('#fff'), { marginLeft: 8 }]}>
                {this.props.title}
              </Text>
            )}
          </View>
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...common.screenHeight(),
    ...common.screenWidth(),
    zIndex: variable.$zIndex_loading
  },
  content: {
    height: 40,
    minWidth: 50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: variable.$zIndex_loading + 1,
    ...common.bgc('#000'),
    opacity: 0.7,
    paddingHorizontal: 10
  }
});

PropTypes.Loading = LoadingPropsType;

Loading.defaultProps = LoadingDefaultProps;
